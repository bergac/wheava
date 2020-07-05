<template>
    <div class="selected-activity">
        <h1 class="name">{{ selectedActivity.name }}</h1>
        <div class="speed">Average speed: {{ selectedActivity.average_speed }}</div>
        <svg :viewBox="'0 0 ' + width + ' ' + height"
             :width="width + margin.left + margin.right"
             :height="height + margin.bottom + margin.top"
             class="linechart">
        </svg>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { StreamSet, SummaryActivity } from '@bergac/strava-v3-ts-axios'
    import { userState } from '@/store/user'
    import * as d3 from 'd3'
    import { Observable, of } from 'rxjs'
    import { map } from 'rxjs/operators'

    @Component
    export default class Activity extends Vue {

        private selectedActivity: SummaryActivity = {}
        private unsubscribe: any
        readonly margin = {
            top: 10,
            right: 10,
            bottom: 100,
            left: 40
        };
        private height = 330 - this.margin.top - this.margin.bottom
        private width = 800 - this.margin.left - this.margin.right

        mounted(): void {
            const selectedId = Number(this.$route.params.id);
            this.selectedActivity = userState.activities
                .filter((activity: SummaryActivity) => activity.id === selectedId)[0];

            if (selectedId && this.selectedActivity) {
                this.$store.dispatch('userStore/fetchStreams', selectedId)
            }

            this.unsubscribe = this.$store.subscribe((mutation, state) => {
                if (mutation.type === 'userStore/saveStreamData' && !!this.selectedActivity.id
                    && !!userState.streamData.get(selectedId)) {
                    const $streamData = of(userState.streamData.get(selectedId));
                    this.createActivityChart($streamData);
                }
            });
        }

        beforeDestroy() {
            this.unsubscribe()
        }

        private createActivityChart($streamSet: Observable<StreamSet>): void {
            $streamSet.pipe(
                map(streamData => [streamData.distance.data, streamData.velocity_smooth.data]),
                map(([distanceData, velocityData]) => distanceData
                    .map((distance, index) => [distance / 1000, velocityData[index] * 3.6])
                    .filter(([distance, speed]) => distance !== 0)
                    .filter((entry, index) => index % 5 === 0) // reduce data points
                )
            ).subscribe(dataPoints => {
                const x = d3.scaleLinear()
                    // @ts-ignore
                    .domain([0, d3.max(dataPoints, d => d[0])])
                    .range([0, this.width]);

                const y = d3.scaleLinear()
                    // @ts-ignore
                    .domain([0, d3.max(dataPoints, d => d[1])])
                    .range([this.height, 0])

                const svg = d3.select(".linechart")
                const chart = svg
                    .append("g")
                    .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
                chart.append("g")
                    .attr("transform", `translate(0, ${this.height})`)
                    .call(d3.axisBottom(x));
                chart.append("g")
                    .call(d3.axisLeft(y));
                chart.append("path")
                    // @ts-ignore
                    .datum(dataPoints)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    // @ts-ignore
                    .attr("d", d3.line().x(d => x(d[0])).y(d => y(d[1])))
            })
        }
    }
</script>

<style>
    .selected-activity {
        flex: 0 0 100%;
        display: flex;
        flex-direction: column;
    }
</style>
