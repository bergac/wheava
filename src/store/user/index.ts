import { Module } from 'vuex'
import { AppState } from '@/store'

/**
 * Model of the UserState.
 * Unfortunately, vuex state needs to be mutable.
 * Hence an interface instead of an immutable class
 */
export interface UserState {
    name: string | undefined
}

const state = { name: undefined }
const getters = { }
const actions = { }
const mutations = { }

export const user: Module<UserState, AppState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
