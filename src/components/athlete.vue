<template>
    <div class="athlete">
        <h1 class="fullname">{{athlete.firstname}} {{athlete.lastname}}</h1>

        <h2>Activities</h2>
        <md-table class="activities-list">
            <md-table-row v-for="activity in activities"
                 :key="activity.id"
                 class="activity"
                 v-on:click="routeToActivity(activity)">
                <md-table-cell><md-icon class="icon">{{forActivityType(activity)}}</md-icon></md-table-cell>
                <md-table-cell class="timestamp">{{ activity.start_date | formatDate }}</md-table-cell>
                <md-table-cell class="name">{{ activity.name }}</md-table-cell>
            </md-table-row>
        </md-table>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { ActivityType, SummaryActivity, SummaryAthlete } from '@bergac/strava-v3-ts-axios'
    import { userState } from '@/store/user'
    import Activity from '@/components/activity.vue'

    @Component({
        components: {Activity}
    })
    export default class Athlete extends Vue {

        private unsubscribe: any;
        private athlete: SummaryAthlete = {}
        private activities: SummaryActivity[] = []

        mounted(): void {
            this.fetchActivities()
        }

        created(): void {
            this.unsubscribe = this.$store.subscribe((mutation, state) => {
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
                    return 'directions_run'
                case ActivityType.Ride:
                case ActivityType.VirtualRide:
                    return 'directions_bike'
                case ActivityType.Swim:
                    return 'pool'
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
    .athlete {
        flex: 1 1 0;
        justify-self: center;
        display: flex;
        flex-direction: column;
    }

    .activity {
        cursor: pointer;
    }

</style>
