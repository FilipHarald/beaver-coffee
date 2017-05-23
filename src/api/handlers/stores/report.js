import utils from '../../utils'

const makeReport = (store, from, to, res) => {
  if (!store || !store.orders || store.orders.length == 0) {
    return res.sendStatus(404)
  }
  const orders = store.orders
  let report = {}

  report.amountOfOrders = orders.length
  report.totalAmount = orders.reduce((tot, order) => {
    return tot + order.total
  }, 0)
  report.avarageAmount = report.totalAmount / report.amountOfOrders
  let timeDiff = Math.abs(to.getTime() - from.getTime())
  report.amountOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  report.amountPerDay = report.totalAmount / report.amountOfDays
  return res.json(report)
}


export default (Store) => {
  return {
    async getSales(req, res) {
      if (!req.query.from || !req.query.to) {
        handleError({name: 'ValidationError'}, res)
      }
      var from = new Date(req.query.from)
      var to = new Date(req.query.to)
      try {
        const store = await Store.find({
          _id: req.params.id,
          'orders.date': {
            $gte: from,
            $lte: to
          }
        }).exec()
        makeReport(store[0], from, to, res)
      } catch (err) {
        utils.handleError(err, res)
      }
    },

    async employeeReport(req, res) {
      if (!req.query.from || !req.query.to) {
        handleError({name: 'ValidationError'}, res)
      }
      var from = new Date(req.query.from)
      var to = new Date(req.query.to)
      try {
        const store = await Store.findOne({
          _id: req.params.id,
          'orders.date': {
            $gte: from,
            $lte: to
          },
          'orders.cashier': req.params.employeeId
        })
        makeReport(store, from, to, res)
      } catch (err) {
        utils.handleError(err, res)
      }
    }
  }
}
