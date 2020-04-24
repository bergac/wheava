import { ActionTree, Module, MutationTree } from 'vuex'
import { AppState } from '@/store'
import { ActivitiesApi, Fault, StreamsApi, StreamSet, SummaryActivity } from '@bergac/strava-v3-ts-axios'
import moment from 'moment';
import { createObservable } from 'axios-observable/lib/create-observable'
import { from } from 'rxjs'

/**
 * Model of the UserState.
 * Unfortunately, vuex state needs to be mutable.
 * Hence an interface instead of an immutable class
 */
export interface UserState {
    latestActivity: SummaryActivity | undefined,
    activityStream: StreamSet | undefined
}

const state: UserState = {
    latestActivity: undefined,
    activityStream: undefined
}
const getters = { }

const actions: ActionTree<UserState, AppState> = {
    fetchActivities({ commit, rootState, dispatch }) {
        // past week
        var sevenDaysAgoEpoch = moment().subtract(7, 'days').valueOf() / 1000;
        from(new ActivitiesApi(rootState.stravaApiConfiguration)
            // only last activity for now
            .getLoggedInAthleteActivities(undefined, sevenDaysAgoEpoch, undefined, 1))
            .subscribe(
                response => {
                    var latestActivity = response.data[0];
                    commit('saveLatestActivity', latestActivity)
                    dispatch('fetchActivityStream', latestActivity.id)
                },
                (fault: Fault) => {
                    // TODO
                    console.log(fault);
                }
            )

    },
    fetchActivityStream({ commit, rootState, dispatch }, activityId: number) {
        from(new StreamsApi(rootState.stravaApiConfiguration).getActivityStreams(
            activityId,
            ['latlng'],
            true))
            .subscribe(
                response => commit('saveActivityStream', response.data),
                (fault: Fault) => console.log(fault))
    }
}

const mutations: MutationTree<UserState> = {
    saveLatestActivity(state: UserState, activity: SummaryActivity) {
        state.latestActivity = activity
    },
    saveActivityStream(state: UserState, activityStream: StreamSet) {
        state.activityStream = activityStream
    }
}

export const userStore: Module<UserState, AppState> = {
    namespaced: true,
    state: {
        latestActivity: undefined,
        activityStream: undefined
    },
    getters,
    actions,
    mutations
}
