
module.exports = async (req, res, $p) => {
  res.setHeader('Content-Type', 'application/json');
  const isPrintData = req.parsed.paths[1] === `print_data`;
  if (isPrintData) {
    const ref = req.parsed.paths[2];
    const order = $p.doc.calc_order.by_ref[ref];
    if (!order) {
      res.write(`Заказ не найден`);
      res.end();
      return;
    }
    order.print_data().then(data => {
      res.write(JSON.stringify(data));
      res.end();
    });
  }
};
