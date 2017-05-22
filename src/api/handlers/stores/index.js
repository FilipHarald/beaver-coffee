import { Router } from 'express'
import storeSchema from '../../../db/models/store'
import Employees from './employees'
import Stock from './stock'
import utils from '../../utils'

export default ({ config, db}) => {
  let store = Router({mergeParams: true})
  const Store = db.model('Store', storeSchema)
  const employees = Employees(Store)
  const stock = Stock(Store)

  const listOrders = (req, res) => {
    Store.findOne({ _id: req.params.id}, { orders: 1 } )
      .then((store) => {
        if (store) {
          res.json(store.orders)
        } else {
          res.sendStatus(404)
        }
      }).catch((err) => {
        utils.handleError(err, res)
      })
  }

  store.get('/orders', listOrders)
  store.get('/employees', employees.list)
  store.post('/employees', employees.create)
  store.put('/employees/:employeeId', employees.update)
  store.post('/stock', stock.create)
  store.put('/stock/:stockId', stock.update)
  store.delete('/stock/:stockId', stock.delete)

  return store
}
