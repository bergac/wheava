import Vue from 'vue'
import Vuex, { MutationTree, StoreOptions } from 'vuex'
import { user } from '@/store/user'
import { appActions } from '@/store/app-actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export interface AppState {
    version: string,
    accessToken: string | undefined
}

export const mutations: MutationTree<AppState> = {
    saveAccessToken(state, accessToken: string) {
        state.accessToken = accessToken
    }
};

const store: StoreOptions<AppState> = {
    state: {
        version: '0.0.1',
        accessToken: undefined
    },
    actions: appActions,
    mutations,
    modules: {
        user
    },
    strict: debug
};

export default new Vuex.Store<AppState>(store);

