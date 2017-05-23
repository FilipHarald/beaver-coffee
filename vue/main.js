import Vue from 'vue'
import moment from 'moment'
import VueRouter from 'vue-router'
import App from './components/App'
import router from './router'

Vue.use(VueRouter)

Vue.filter('date', function (date, format) {
  return moment(date).format(format)
})

const app = new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
