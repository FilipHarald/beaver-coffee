import { Router } from 'express'
import storeSchema from '../../../db/models/store'
import Employees from './employees'
import Orders from './orders'
import utils from '../../utils'

export default ({ config, db}) => {
  let store = Router({mergeParams: true})
  const Store = db.model('Store', storeSchema)
  const employees = Employees(Store)
  const orders = Orders(Store)

  store.get('/employees', employees.list)
  store.post('/employees', employees.create)
  store.put('/employees/:employeeId', employees.update)

  store.get('/orders', orders.list)
  store.post('/orders', orders.create)
  store.put('/orders/:employeeId', orders.update)

  return store
}
