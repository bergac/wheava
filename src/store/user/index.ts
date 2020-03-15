import { Module } from 'vuex'
import { AppState } from '@/store'
import { actions } from './actions';
import { mutations } from '@/store/user/mutations'

/**
 * Model of the UserState.
 * Unfortunately, vuex state needs to be mutable.
 * Hence an interface instead of an immutable class
 */
export interface UserState {
    name: string | undefined
    accessToken: string | undefined
}

const state = { name: undefined, accessToken: undefined }

// getters
const getters = {
    accessToken: (state: UserState) => {
        return state.accessToken
    }
}

export const user: Module<UserState, AppState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
