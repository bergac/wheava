<template>
    <div class="athlete">
        <div class="pure-g" v-if="!!athlete">
            <div class="pure-u-1-1 name h1">
                {{athlete.firstname}} {{athlete.lastname}}
            </div>

            <div class="pure-u-1-1 activities-list pure-g">
                <div class="pure-u-1-1 h2">Activities</div>
                <div v-for="activity in activities" :key="activity.id" class="pure-u-1-3 activity">
                    <button class="pure-button" v-on:click="routeToActivity(activity)">
                        <font-awesome-icon v-bind:icon="forActivityType(activity)"/>
                        {{ activity.name }} ({{ activity.start_date }})
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { ActivityType, SummaryActivity, SummaryAthlete } from '@bergac/strava-v3-ts-axios'
    import store from '@/store'
    import { userState } from '@/store/user'

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
                }
                if (mutation.type === 'userStore/saveActivities') {
                    this.activities = userState.activities
                }
            });
        }

        fetchActivities(): void {
            this.$store.dispatch('userStore/fetchActivities')
        }

        forActivityType(activity: SummaryActivity): string {
            switch (activity.type) {
                case ActivityType.Run:
                case ActivityType.VirtualRun:
                    return 'running'
                case ActivityType.Ride:
                case ActivityType.VirtualRide:
                    return 'biking'
                default:
                    return 'question-circle'
            }
        }

        routeToActivity(activity: SummaryActivity): void {
            this.$router.push(`/athlete/activity/${activity.id}`)
        }

        beforeDestroy() {
            this.unsubscribe()
        }
    }
</script>

<style>
    .activity {
        margin: 0.1rem;
        padding: 0.1rem;
    }
</style>
