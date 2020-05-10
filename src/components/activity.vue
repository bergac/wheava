<template>
    <div class="selected-activity">
        <div class="pure-g" v-if="!!selectedActivity.id">
            Speed: {{ selectedActivity.average_speed }}
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { SummaryActivity } from '@bergac/strava-v3-ts-axios'
    import { userState } from '@/store/user'

    @Component
    export default class Activity extends Vue {

        private selectedId: number = 0
        private selectedActivity: SummaryActivity = {}

        mounted(): void {
            this.selectedId = Number(this.$route.params.id);
            this.selectedActivity = userState.activities
                .filter((activity: SummaryActivity) => activity.id === this.selectedId)[0];
        }
    }
</script>

<style>
</style>
