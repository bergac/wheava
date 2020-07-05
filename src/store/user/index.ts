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
    activities: SummaryActivity[],
    selectedActivity: SummaryActivity | undefined
    streamData: Map<number, StreamSet>
}

const INITIAL_STATE: UserState = {
    activities: [],
    selectedActivity: undefined,
    streamData: new Map()

}
const getters = { }

const actions: ActionTree<UserState, AppState> = {
    fetchActivities({ commit, rootState }) {
        // past week
        var sevenDaysAgoEpoch = moment().subtract(7, 'days').valueOf() / 1000;
        fromPromise(new ActivitiesApi({ accessToken: rootState.token?.accessToken })
            // only last 10 activities for now
            .getLoggedInAthleteActivities(undefined, sevenDaysAgoEpoch, undefined, 10))
            .subscribe(
                response => commit('saveActivities', response.data),
                (fault: Fault) => console.log(fault) // TODO create error event
            )

    },
    fetchStreams({ commit, rootState, dispatch }, activityId: number) {
        fromPromise(new StreamsApi({ accessToken: rootState.token?.accessToken })
            .getActivityStreams(activityId, ['distance', 'time', 'latlng', 'velocity_smooth'], true))
            .subscribe(response => commit('saveStreamData', {activityId, streamSet: response.data}),
                (fault: Fault) => console.log(fault))
    }
}

const mutations: MutationTree<UserState> = {
    saveActivities(state: UserState, activities: SummaryActivity[]) {
        state.activities = activities
    },
    saveStreamData(state: UserState, { activityId, streamSet }) {
        state.streamData = state.streamData.set(activityId, streamSet)
    }
}

export const userStore: Module<UserState, AppState> = {
    namespaced: true,
    state: INITIAL_STATE,
    getters,
    actions,
    mutations
}

// @ts-ignore
export const userState: UserState = userStore.state
