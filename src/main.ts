import Vue from 'vue'
import App from './App.vue'
import VueRx from 'vue-rx';
import store from '@/store'

Vue.config.productionTip = false
Vue.use(VueRx)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
