<template>
    <div class="athlete">
        <div class="pure-g" v-if="!!athlete">
            <div class="pure-u-1-1 name h1">{{athlete.firstname}} {{athlete.lastname}}</div>
            <div class="pure-u-1-1 activities-list">
                Activities:
                <ul class="pure-u-1-1 pure-g">
                    <li v-for="activity in activities" :key="activity.id" class="pure-u-1-3">
                        {{ activity.name }} ({{ activity.startDate }})
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { SummaryActivity, SummaryAthlete } from '@bergac/strava-v3-ts-axios'
    import store from '@/store'
    import { userStore } from '@/store/user'

    @Component
    export default class Athlete extends Vue {

        private unsubscribe: any;
        private athlete: SummaryAthlete = {}
        private activities: SummaryActivity[] = []

        mounted(): void {
            this.fetchActivities()
        }

        created(): void {
            this.unsubscribe = store.subscribe((mutation, state) => {
                if (this.athlete.id !== state.user?.id) {
                    this.athlete = state.user
                    //this.fetchActivities()
                }
                if (mutation.type === 'userStore/saveActivities') {
                    // @ts-ignore tsc can't handle this
                    this.activities = userStore.state.activities
                }
            });
        }

        fetchActivities(): void {
            this.$store.dispatch('userStore/fetchActivities')
        }

        beforeDestroy() {
            this.unsubscribe()
        }
    }
</script>

<style>
    .activities-list {

    }
</style>
