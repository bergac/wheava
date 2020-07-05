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
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import moment from 'moment'


Vue.use(VueMaterial)

// @ts-ignore
Vue.material = {
    // @ts-ignore
    ...Vue.material,
    locale: {
        // @ts-ignore
        ...Vue.material.locale,
        dateFormat: 'dd-MM-yyyy',
        firstDayOfAWeek: 1
    }
}

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('DD MMM YYYY hh:mm')
    }
})

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
