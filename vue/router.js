import VueRouter from 'vue-router'
import Home from './components/Home'
import AddOrder from './components/AddOrder'
import AddCustomer from './components/AddCustomer'
import ManageStock from './components/ManageStock'

const routes = [
  { path: '/', component: Home },
  { path: '/add_order', component: AddOrder },
  { path: '/manage_stock', component: ManageStock },
  { path: '/add_customer', component: AddCustomer }
]

export default new VueRouter({
  routes
})
