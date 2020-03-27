import { ActionTree } from 'vuex'
import { AppState } from '@/store'
import { StravaAuthClient } from '@/strava/strava-auth-client'

export const appActions: ActionTree<AppState, any> = {
    login({dispatch}): void {
        const code = StravaAuthClient.authorizationCodeFromUrl();
        if (code) {
            dispatch('fetchAccessToken', code)
        } else {
            location.replace(StravaAuthClient.authorizationUrl());
        }
    },
    fetchAccessToken({commit}, authorizationCode: string): void {
        StravaAuthClient.postAuthorizationCode(authorizationCode).subscribe(
            stravaAuthResponse => commit('saveAccessToken', stravaAuthResponse),
            error => console.log(error)
        )
    }
};
