import { ActionTree } from 'vuex'
import { AppState } from '@/store'
import { StravaAuthClient } from '@/strava/strava-auth-client'
import { Fault } from '@bergac/strava-v3-ts-axios'

export const appActions: ActionTree<AppState, any> = {
    login({dispatch, commit, rootState}): void {
        const tokenFromStorage = sessionStorage.getItem('wheava');
        if (tokenFromStorage) {
            commit('saveAccessToken', JSON.parse(tokenFromStorage));
            return;
        }
        const code = rootState.route.query.code;
        if (code) {
            dispatch('fetchAccessToken', code)
        } else {
            location.replace(StravaAuthClient.authorizationUrl());
        }
    },
    fetchAccessToken({commit}, authorizationCode: string): void {
        StravaAuthClient.postAuthorizationCode(authorizationCode).subscribe(
            stravaAuthResponse => commit('saveAccessToken', stravaAuthResponse),
            (fault: Fault) => {
                console.log(fault)
                // if (fault.errors) TODO
            }
        )
    }
};
