import { Router } from 'express'
import storeSchema from '../../../db/models/store'
import Employees from './employees'
import utils from '../../utils'

export default ({ config, db}) => {
  let store = Router({mergeParams: true})
  const Store = db.model('Store', storeSchema)
  const employees = Employees(Store)

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
  store.post('/employees/:employeeId', employees.create)

  return store
}
