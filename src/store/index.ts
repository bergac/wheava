import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { user } from '@/store/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export interface AppState {
    version: string,
    isAuthenticated: boolean
}

const store: StoreOptions<AppState> = {
    state: {
        version: '0.0.1',
        isAuthenticated: false
    },
    modules: {
        user
    },
    strict: debug
};

export default new Vuex.Store<AppState>(store);

// const appStore: StoreOptions<AppState> = {
//     state: {
//         user: User.unknown()
//     },
//
//     mutations: {
//         saveAccessToken(state, accessToken: string) {
//             state.user = new User(state.user.name, accessToken)
//         }
//     },
//
//     actions: {
//         saveAccessToken(context, accessToken: string) {
//             context.commit('saveAccessToken', accessToken)
//         }
//     }
// }
