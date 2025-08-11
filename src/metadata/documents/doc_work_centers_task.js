
exports.DocWork_centers_taskManager = class DocWork_centers_taskManager extends Object {

  get cut_defaults() {
    if(!this._cut_defaults) {
      const {$p: {job_prm}} = this._owner;
      this._cut_defaults = Object.freeze({
        iterations: 2900,
        size: 210,        // размер популяции
        crossover: 0.19,
        mutation: 0.26,
        random: 0.21,
        skip: 55,         // прекращаем итерации, если решение не улучшилось за 55 шагов
        webWorkers: !job_prm.is_node,
        batch: 101,       // размер партии
        usefulscrap: 610, // деловой остаток
      });
    }
    return this._cut_defaults;
  }
}


exports.DocWork_centers_task = class DocWork_centers_task extends Object {

  /**
   * значения по умолчанию при добавлении строки
   * @param {TabularSectionRow} row
   * @param {Object} [attr]
   */
  add_row(row, attr) {
    if(row?._owner === this.cuts) {
      if(!row.stick && !attr?.stick) {
        const {_obj} = row._owner;
        row._obj.stick = 1 + (_obj.length ? Math.max.apply(null, _obj.map(({stick}) => stick)) : 0);
      }
    }
  }


  fill_cuts() {
    const {debit} = $p.enm.debit_credit_kinds;
    const {cutting, cuts} = this;
    for(const {nom, characteristic} of cutting) {
      if(!cuts.find({nom, characteristic})) {
        cuts.add({
          record_kind: debit,
          nom,
          characteristic,
          len: nom.len,
          width: nom.width,
          quantity: nom.width ? 100 : nom.len / 1000,
        });
      }
    }
    return this;
  }

  fragments2D() {
    const {debit} = $p.enm.debit_credit_kinds;
    const res = {
      products: [],
      scraps: [],
      options: {}
    };
    for(const row of this.cuts) {
      if(row.record_kind.empty()) {
        row.record_kind = debit;
      }
      if(!row.stick) {
        row.stick = this.cuts.aggregate([], ['stick'], 'max') + 1;
      }
      if(row.record_kind.is('debit') && row.width && row.len && row.quantity) {
        res.scraps.push({stick: row.stick, length: row.len, height: row.width, quantity: row.quantity});
      }
    }
    for(const row of this.cutting) {
      if(row.width && row.len) {
        res.products.push({id: row.row, length: row.len, height: row.width, quantity: 1, info: row.row});
      }
    }
    return res;
  }

  /**
   * Возвращает свёрнутую структуру номенклатур, характеристик и партий раскроя
   */
  fragments1D(noParts) {
    const {_owner: {$p: {utils}}, cut_defaults} = this._manager;
    const res = new Map();
    const fin = [];
    for(const row of this.cutting) {
      if(row.width) {
        continue;
      }
      if(!res.has(row.nom)) {
        res.set(row.nom, new Map());
      }
      const nom = res.get(row.nom);
      if(!nom.has(row.characteristic)) {
        nom.set(row.characteristic, []);
      }
      const characteristic = nom.get(row.characteristic);
      if(!noParts) {
        row.stick = 0;
        row.part = 0;
      }
      characteristic.push(row);
    }
    if(noParts) {
      return res;
    }
    // расставим партии
    for(const [nom, characteristics] of res) {
      for(const [characteristic, rows] of characteristics) {
        if(rows.length > cut_defaults.batch) {
          rows.sort(utils.sort('len'));
          const parts = (rows.length / cut_defaults.batch + 0.5).round();
          const part = (rows.length / parts).round();
          for(let i1 = 0; i1 < part; i1++) {
            for(let i2 = 0; i2 < parts; i2++) {
              const rowNum = i1 * parts + i2;
              if(rowNum >= rows.length) {
                continue;
              }
              const row = rows[rowNum];
              if(!row.pair) {
                row.part = i2;
              }
              else {
                for(const prow of rows) {
                  if(prow.pair === row.pair) {
                    prow.part = i2;
                  }
                }
              }
            }
          }
          for(let part = 0; part < parts; part++) {
            fin.push({nom, characteristic, part, parts, rows: rows.filter((row) => row.part === part)});
          }
        }
        else {
          fin.push({nom, characteristic, part: 0, parts: 1, rows});
        }
      }
    }
    return fin;
  }

  onStep1D(state) {
    return (status) => {
      const {nom, characteristic} = status.cut_row;
      const statuses = [...state.statuses];
      let row;
      if(!statuses.some((elm) => {
        if(elm.nom === nom && elm.characteristic === characteristic) {
          row = elm;
          return true;
        }
      })) {
        row = {nom, characteristic};
        statuses.push(row);
      }
      Object.assign(row, status);

      state.statuses = statuses;
    };
  }

  /**
   * @summary Выполняет оптимизацию раскроя
   * @param {Function} [onStep]
   * @param {Object} [state]
   * @return {Promise<Awaited<unknown>[]>}
   */
  optimize({onStep, state}) {
    const {classes: {Cutting}} = $p;
    if(!state) {
      state = {statuses: []};
    }
    if(!onStep) {
      onStep = this.onStep1D(state);
    }
    const keys = new Set();
    const queues = [Promise.resolve(), Promise.resolve(), Promise.resolve()];
    let index = -1;
    for(const {nom, characteristic, part, parts, rows} of this.fragments1D()) {
      const key = nom.valueOf() + characteristic.valueOf();
      if(!keys.has(key)) {
        keys.add(key);
        index++;
        if(index > 2) {
          index = 0;
        }
      }
      queues[index] = queues[index].then(() => this.optimize_fragment({
        cutting: new Cutting('1D'),
        rows,
        part,
        parts,
        onStep,
      }));
    }
    const fin = [];
    Object.values(queues).forEach((v, index) => {
      const i = index % 2;
      if(!fin[i]) {
        fin[i] = v;
      }
      else {
        fin[i] = fin[i].then(() => v);
      }
    })
    return Promise.all(fin)
      .then(() => state);
  }

  /**
   * Выполняет оптимизацию фрагмента (номенклатура+характеристика+тип)
   * @param opts
   * @return {Promise<void>}
   */
  optimize_fragment({cutting, rows, onStep, part, parts}) {
    const {_owner: {$p: {job_prm}}, cut_defaults} = this._manager;

    return new Promise((resolve) => {

      const doc = this;
      const workpieces = [];
      const cut_row = rows[0];
      if(cut_row) {
        // ищем запись в расходе - её туда могли положить руками, либо подтянулось из остатков
        this.cuts.find_rows({
          _top: 10e6,
          //record_kind: debit_credit_kinds.debit,
          nom: cut_row.nom,
          characteristic: cut_row.characteristic,
        }, (row) => {
          const len = row.len - row.used;
          if(len >= rows[0].len && len >= (cut_row.nom.usefulscrap || cut_defaults.usefulscrap)) {
            workpieces.push(row);
          }
        });
      }

      const config = Object.assign({}, cut_defaults);
      if(rows.length < 13) {
        config.iterations = 100;
      }
      const len0 = rows[0].len;
      if(rows.every(({len}) => len === len0)) {
        config.iterations = 3;
      }
      const userData = {
        products: rows.map((row) => row.len),
        workpieces: workpieces.map((row) => row.len - row.used),
        overmeasure: 0,
        wrongsnipmin: 0,
        wrongsnipmax: 0,
        sticklength: cut_row.nom.len || 6000,
        knifewidth: cut_row.nom.knifewidth || 7,
        usefulscrap: cut_row.nom.usefulscrap || cut_defaults.usefulscrap,
      };
      cutting.genetic.notification = function(pop, generation, stats, isFinished) {

        if(job_prm.idle) {
          job_prm.idle.activity = Date.now();
        }

        if(!generation) {
          return;
        }

        // текущий результат
        const decision = Object.assign({
          cut_row,
          userData,
          cuts: workpieces,
          rows,
          part,
          parts,
          progress: isFinished ? 1 : generation / this.configuration.iterations,
        }, this.fitness(pop[0].entity, true));

        // обновляем интерфейс
        onStep(decision);

        if(isFinished) {
          // обновляем документ
          doc.push_cut_result(decision, part + 1 === parts);
          resolve();
        }

      };

      cutting.evolve(config, userData);

    });
  }

  /**
   * помещает результат раскроя в документ
   */
  push_cut_result(decision, fin) {
    const {debit_credit_kinds} = $p.enm;
    // сначала добавляем заготовки
    for(let i = 0; i < decision.workpieces.length; i++) {
      let workpiece = decision.cuts[i];

      if(workpiece) {
        workpiece.used = workpiece.len - decision.workpieces[i];
        //workpiece.quantity = decision.workpieces[i] / 1000;
      }
      else {
        workpiece = this.cuts.add({
          record_kind: debit_credit_kinds.credit,
          nom: decision.cut_row.nom,
          characteristic: decision.cut_row.characteristic,
          len: decision.userData.sticklength,
          quantity: decision.userData.sticklength / 1000,
        });
        decision.cuts.push(workpiece);
      }
    }

    // проставляем номера палок в раскрое
    for(let i = 0; i < decision.res.length; i++) {
      const {stick} = decision.cuts[decision.res[i]];
      decision.rows[i].stick = stick;
    }
    for(let i = 0; i < decision.res.length; i++) {
      const cut_row = decision.cuts[decision.res[i]];
      const rows = this.cutting.find_rows({stick: cut_row.stick});
      const len = rows.reduce((sum, row) => sum + row.len + decision.userData.knifewidth, 0);
      cut_row.used = len;
    }
    if(fin) {
      // формируем приход деловых остатков
      const workpieces = [];
      this.cuts.find_rows({
        _top: 10e6,
        nom: decision.cut_row.nom,
        characteristic: decision.cut_row.characteristic,
      }, (row) => {
        const len = row.len - row.used;
        if(len >= decision.userData.usefulscrap) {
          workpieces.push({
            record_kind: debit_credit_kinds.debit,
            nom: decision.cut_row.nom,
            characteristic: decision.cut_row.characteristic,
            len,
            quantity: len / 1000,
          });
        }
      });
      for(const raw of workpieces) {
        this.cuts.add(raw);
      }
    }

  }

  /**
   * @summary Чистит результаты раскроя в табчасти cutting
   * @desc Параллельно, подчищает табчасть cuts
   */
  reset_sticks(kind) {
    const noms = new Map();
    for(const row of this.cutting) {
      if(!kind || (kind === '1D' && !row.width) || (kind === '2D' && row.width)) {
        if(noms.has(row.nom)) {
          noms.get(row.nom).add(row.characteristic);
        }
        else {
          noms.set(row.nom, new Set([row.characteristic]));
        }
        row.stick = 0;
        row.pair = 0;
      }
    }
    const rm = [];
    for(const [nom, characteristics] of noms) {
      for(const characteristic of characteristics) {
        this.cuts.find_rows({nom, characteristic}, (row) => {
          if(row.record_kind.is('credit') || (!row.width && row.len === nom.len) || (row.width === nom.width && row.len === nom.len)) {
            rm.push(row);
          }
          else {
            row.dop = {svg: ''};
          }
        });
      }
    }
    for(const row of rm) {
      this.cuts.del(row);
    }
  }

}
