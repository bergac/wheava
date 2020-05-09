import { ActionTree, Module, MutationTree } from 'vuex'
import { AppState } from '@/store'
import { ActivitiesApi, Fault, StreamsApi, StreamSet, SummaryActivity } from '@bergac/strava-v3-ts-axios'
import moment from 'moment';
import { fromPromise } from 'rxjs/internal-compatibility'
import { AxiosResponse } from 'axios'

/**
 * Model of the UserState.
 * Unfortunately, vuex state needs to be mutable.
 * Hence an interface instead of an immutable class
 */
export interface UserState {
    activities: SummaryActivity[],
    selectedActivity: SummaryActivity | undefined
    selectedActivityStream: StreamSet | undefined
}

const state: UserState = {
    activities: [],
    selectedActivity: undefined,
    selectedActivityStream: undefined

}
const getters = { }

const actions: ActionTree<UserState, AppState> = {
    fetchActivities({ commit, rootState }) {
        // past week
        var sevenDaysAgoEpoch = moment().subtract(7, 'days').valueOf() / 1000;
        fromPromise(new ActivitiesApi({ accessToken: rootState.token?.accessToken })
            // only last activity for now
            .getLoggedInAthleteActivities(undefined, sevenDaysAgoEpoch, undefined, 10))
            .subscribe(
                (response: AxiosResponse<SummaryActivity[]>) => {
                    // TODO doesn't match cause snake_case (response) and camelCase (api model)
                    const activities = response.data;
                    commit('saveActivities', activities)
                    // dispatch('fetchActivityStream', latestActivity.id)
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
    saveActivities(state: UserState, activities: SummaryActivity[]) {
        state.activities = activities
    },
    saveActivityStream(state: UserState, activityStream: StreamSet) {
        state.selectedActivityStream = activityStream
    }
}

export const userStore: Module<UserState, AppState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
