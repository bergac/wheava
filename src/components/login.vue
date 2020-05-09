<template>
    <div class="pure-u-5-5">
        Login
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import store from '@/store'
    import 'vue-router'

    @Component
    export default class Login extends Vue {

        private unsubscribe: any;
        private loggedInAthleteId: Number | undefined;

        mounted() {
            if (!store.state.token || !store.state.token.isValid()) {
                store.dispatch('login')
            } else {
                this.loggedInAthleteId = store.state.user?.id
                this.$router.push('/athlete');
            }
        }

        created(): void {
            this.unsubscribe = store.subscribe((mutation) => {
                if (mutation.type === 'saveAccessToken') {
                    if (this.loggedInAthleteId !== mutation.payload.athlete.id) {
                        this.loggedInAthleteId = mutation.payload.athlete.id
                        this.$router.push('/athlete');
                    }
                }
            });
        }
    }
</script>

<style>
    login {

    }
</style>
