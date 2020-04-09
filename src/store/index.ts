import Vue from 'vue'
import Vuex, { MutationTree, StoreOptions } from 'vuex'
import { user } from '@/store/user'
import { appActions } from '@/store/app-actions'
import { StravaApi } from '@bergac/strava-v3-ts-axios/dist/base'
import { Configuration, SummaryAthlete } from '@bergac/strava-v3-ts-axios'
import { StravaAuthResponse } from '@/strava/api/strava-auth-response'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export interface AppState {
    version: string,
    stravaClient: StravaApi | undefined,
    user: SummaryAthlete
}

export const mutations: MutationTree<AppState> = {
    saveAccessToken(state, stravaAuthResponse: StravaAuthResponse) {
        state.stravaClient = new StravaApi(
            new Configuration({
                accessToken: stravaAuthResponse.accessToken,
            })
        )
        state.user = stravaAuthResponse.athlete
    }
};

const store: StoreOptions<AppState> = {
    state: {
        version: '0.0.1',
        stravaClient: undefined,
        user: {}
    },
    actions: appActions,
    mutations,
    modules: {
        user
    },
    strict: debug
};

export default new Vuex.Store<AppState>(store);

