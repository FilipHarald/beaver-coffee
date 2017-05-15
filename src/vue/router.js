import VueRouter from 'vue-router'
import Home from './components/Home'
import Order from './components/Order'

const routes = [
  { path: '/', component: Home },
  { path: '/order', component: Order }
]

export default new VueRouter({
  routes
})
