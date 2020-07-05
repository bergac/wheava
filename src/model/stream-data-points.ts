import { LatLng, StreamSet, StreamType } from '@bergac/strava-v3-ts-axios'

export class StreamDataPoints {
    private readonly dataPoints: Array<StreamDataPoint>;

    constructor(streamSet: StreamSet) {
        // @ts-ignore
        this.dataPoints = streamSet.distance?.data?.map(
            (distancePoint, index) => new StreamDataPoint(
                distancePoint,
                // @ts-ignore
                streamSet.velocity_smooth?.data[index],
                // @ts-ignore
                streamSet.time?.data[index],
                // @ts-ignore
                streamSet.latlng?.data[index]
            ))
        this.dataPoints.sort((a, b) => a.distance - b.distance)
    }

    getDataPoints(): Array<StreamDataPoint> {
        return Object.assign({}, this.dataPoints)
    }
}

export class StreamDataPoint {
    constructor(readonly distance: number,
                readonly velocity: number,
                readonly time: number,
                readonly latlng: LatLng) {}
}
