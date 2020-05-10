import Vue from 'vue'
import App from './app.vue'
import VueRx from 'vue-rx';
import store from '@/store'
import Axios from 'axios'
import VueRouter from 'vue-router'
import Athlete from '@/components/athlete.vue'
import Activity from '@/components/activity.vue'
import Login from '@/components/login.vue'
import { sync } from 'vuex-router-sync'
import 'purecss/build/pure-min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// TODO importing everything is not good for bundle size
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueRx)
Vue.use(VueRouter)

const routes = [
    {path: '/athlete/activity/:id', component: Activity},
    {path: '/athlete', component: Athlete},
    {path: '/login', component: Login},
]
const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})

Vue.prototype.$http = Axios.create({
    baseURL: 'https://www.strava.com',
    headers: {'Content-Type': 'application/json'}
})

sync(store, router)

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
