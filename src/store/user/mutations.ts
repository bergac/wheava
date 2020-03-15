import { MutationTree } from 'vuex';
import { UserState } from '@/store/user/index'

export const mutations: MutationTree<UserState> = {
    saveAccessToken(state, accessToken: string) {
        state.accessToken = accessToken
    }
};
