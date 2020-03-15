import { ActionTree } from 'vuex'
import { AppState } from '@/store'
import { UserState } from '@/store/user/index'
import { StravaAuthClient } from '@/strava/strava-auth-client'

export const actions: ActionTree<UserState, AppState> = {
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
            response => commit('saveAccessToken', response.data.access_token),
            error => console.log(error)
        )
    }
};
