import Vue from 'vue'
import App from './app.vue'
import VueRx from 'vue-rx';
import store from '@/store'
import Axios from 'axios'
import VueRouter from 'vue-router'
import Athlete from '@/components/athlete.vue'
import Activities from '@/components/activities.vue'
import Login from '@/components/login.vue'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false
Vue.use(VueRx)
Vue.use(VueRouter)

const routes = [
    {path: '/athlete/activities', component: Activities},
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
