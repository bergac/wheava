import Vue from 'vue'
import Vuex, { GetterTree, MutationTree, StoreOptions } from 'vuex'
import { userStore } from '@/store/user'
import { appActions } from '@/store/app-actions'
import { SummaryAthlete } from '@bergac/strava-v3-ts-axios'
import { StravaAuthResponse } from '@/strava/api/strava-auth-response'
import { AuthToken } from '@/store/auth-token'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export interface AppState {
    version: string,
    user: SummaryAthlete | undefined
    token: AuthToken | undefined
}

const mutations: MutationTree<AppState> = {
    saveAccessToken(state: AppState, stravaAuthResponse: StravaAuthResponse) {
        state.user = stravaAuthResponse.athlete
        state.token = AuthToken.fromJs(stravaAuthResponse);

        sessionStorage.setItem('wheava', JSON.stringify(stravaAuthResponse));
        Vue.prototype.$stravaClient.defaults.headers.common['Authorization'] = stravaAuthResponse.accessToken;
        // location.href = location.origin;
    }
};

// const getters: GetterTree<AppState, any> = {
//     activitiesApi(state): ActivitiesApi {
//         return new ActivitiesApi(state.stravaApiConfiguration);
//     }
//
// }

const store: StoreOptions<AppState> = {
    state: {
        version: '0.0.1',
        user: undefined,
        token: undefined
    },
    actions: appActions,
    mutations,
    modules: {
        userStore
    },
    strict: debug
};

export default new Vuex.Store<AppState>(store);

