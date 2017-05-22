import { Router } from 'express'
import storeSchema from '../../../db/models/store'
import Employees from './employees'
import Orders from './orders'
import Stock from './stock'
import utils from '../../utils'

export default ({ config, db}) => {
  let store = Router({mergeParams: true})
  const Store = db.model('Store', storeSchema)
  const employees = Employees(Store)
  const orders = Orders(Store)
  const stock = Stock(Store)

  store.get('/employees', employees.list)
  store.post('/employees', employees.create)
  store.put('/employees/:employeeId', employees.update)
  store.post('/stock', stock.create)
  store.put('/stock/:stockId', stock.update)
  store.delete('/stock/:stockId', stock.delete)

  store.get('/orders', orders.list)
  store.post('/orders', orders.create)
  store.put('/orders/:employeeId', orders.update)

  return store
}
