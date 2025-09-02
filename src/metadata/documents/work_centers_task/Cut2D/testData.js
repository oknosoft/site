
const {doc, job_prm, enm} = $p;
export const nom = job_prm.nom.glass;
const cuts = [[3400, 2700, 100], [1920, 2700, 1]];
const products = [1356,1436,646,2260,1086,1626,1086,1626,1086,1626,1086,1626,1086,1626,586,1626,586,1626,
  1746,1746,1746,1103,1766,1766,710,1746,2660,1166,1746,1166,1746,1746,970,1746,2656,1746,590,1746,1410,1746,
  2666,1746,2666,1166,1746,1166,1746,686,1056,686,1056,666,1056,609,1056,666,1056,676,1056,646,1076];
export const obj = doc.work_centers_task.create({}, false, true)._set_loaded();
export const record_kind = enm.debit_credit_kinds.debit;

obj.fillDefault = function () {
  obj.cuts.clear();
  obj.cutting.clear();
  for(const [len, width, quantity] of cuts) {
    obj.cuts.add({record_kind, nom, len, width, quantity});
  }
  for(const len of products) {
    obj.cutting.add({nom, len});
  }
}

obj.fillDefault();
