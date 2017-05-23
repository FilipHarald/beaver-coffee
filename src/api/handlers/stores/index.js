import { Router } from 'express'
import Employees from './employees'
import Orders from './orders'
import Stock from './stock'
import Report from './report'
import utils from '../../utils'

export default ({ config, db}) => {
  let store = Router({mergeParams: true})
  const Store = db.model('Store')
  const Customer = db.model('Customer')
  const employees = Employees(Store)
  const orders = Orders(Store, Customer)
  const stock = Stock(Store)
  const report = Report(Store)

  store.get('/employees', employees.list)
  store.post('/employees', employees.create)
  store.put('/employees/:employeeId', employees.update)

  store.post('/stock', stock.create)
  store.put('/stock/:stockId', stock.update)
  store.delete('/stock/:stockId', stock.delete)


  store.get('/orders', orders.list)
  store.post('/orders', orders.create)
  store.put('/orders/:employeeId', orders.update)

  store.get('/report', report.getSales)
  store.get('/employees/:employeeId/report', report.employeeReport)

  return store
}
