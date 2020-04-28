import { ActionTree, Module, MutationTree } from 'vuex'
import { AppState } from '@/store'
import { ActivitiesApi, Fault, StreamsApi, StreamSet, SummaryActivity } from '@bergac/strava-v3-ts-axios'
import moment from 'moment';
import { fromPromise } from 'rxjs/internal-compatibility'

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
        fromPromise(new ActivitiesApi()
            // only last activity for now
            .getLoggedInAthleteActivities(undefined, sevenDaysAgoEpoch, undefined, 1))
            .subscribe(
                response => {
                    const latestActivity = response.data[0];
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
        fromPromise(new StreamsApi().getActivityStreams(
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
