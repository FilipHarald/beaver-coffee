import VueRouter from 'vue-router'
import Home from './components/Home'
import AddOrder from './components/AddOrder'
import AddCustomer from './components/AddCustomer'
import ManageStock from './components/ManageStock'
import ManageCustomers from './components/ManageCustomers'
import ManageEmployees from './components/ManageEmployees'
import GenerateReports from './components/GenerateReports'

const routes = [
  { path: '/', component: Home },
  { path: '/add_order', component: AddOrder },
  { path: '/add_customer', component: AddCustomer },
  { path: '/manage_stock', component: ManageStock },
  { path: '/manage_customers', component: ManageCustomers },
  { path: '/manage_employees', component: ManageEmployees },
  { path: '/generate_report', component: GenerateReports }
]

export default new VueRouter({
  routes
})
