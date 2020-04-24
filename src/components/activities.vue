<template>
    <div class="activities">
        <div class="pure-g" v-if="!!latestActivity">
            Speed: {{ latestActivity.averageSpeed }}
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import { SummaryActivity } from '@bergac/strava-v3-ts-axios'

    @Component
    export default class Activities extends Vue {

        private unsubscribe: any;
        private latestActivity: SummaryActivity = {}

        mounted(): void {
            this.fetchActivities()
        }

        created(): void {
            this.unsubscribe = this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'updateStatus') {
                    console.log(`Updating to ${state.latestActivity}`);

                    this.latestActivity = state.latestActivity
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
    .container {
        margin: 0;
        padding: 0;
    }

    .main {
        height: calc(100vh - 6rem)
    }

    header, footer {
        background-color: #599ae7;
        height: 3rem;
    }

    app {

    }
</style>
