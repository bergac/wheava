import Vue from 'vue'
import App from './app.vue'
import VueRx from 'vue-rx';
import store from '@/store'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueRx)

Vue.prototype.$stravaClient = Axios.create({
    baseURL: 'https://www.strava.com',
    headers: { 'Content-Type': 'application/json' }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
