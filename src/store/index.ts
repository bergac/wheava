import Vue from 'vue'
import Vuex, { GetterTree, MutationTree, StoreOptions } from 'vuex'
import { userStore } from '@/store/user'
import { appActions } from '@/store/app-actions'
import { BASE_PATH, StravaApi } from '@bergac/strava-v3-ts-axios/dist/base'
import { ActivitiesApi, Configuration, SummaryAthlete } from '@bergac/strava-v3-ts-axios'
import { StravaAuthResponse } from '@/strava/api/strava-auth-response'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export interface AppState {
    version: string,
    stravaApiConfiguration: Configuration | undefined,
    loggedInUser: SummaryAthlete | undefined
}

const mutations: MutationTree<AppState> = {
    saveAccessToken(state: AppState, stravaAuthResponse: StravaAuthResponse) {
        state.stravaApiConfiguration = new Configuration({
                accessToken: stravaAuthResponse.accessToken,
            })
        state.loggedInUser = stravaAuthResponse.athlete
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
        stravaApiConfiguration: undefined,
        loggedInUser: undefined
    },
    actions: appActions,
    mutations,
    modules: {
        userStore
    },
    strict: debug
};

export default new Vuex.Store<AppState>(store);

