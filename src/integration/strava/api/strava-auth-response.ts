import { SummaryAthlete } from '@bergac/strava-v3-ts-axios'

export class StravaAuthResponse {
    readonly tokenType: string
    readonly expiresAt: Number
    readonly expiresIn: Number
    readonly refreshToken: string
    readonly accessToken: string
    readonly athlete: SummaryAthlete

    static fromJs(data?: any): StravaAuthResponse {
        data = data || {}

        return new StravaAuthResponse(
            data.token_type,
            data.expires_at,
            data.expires_in,
            data.refresh_token,
            data.access_token,
            data.athlete
        )
    }

    private constructor(tokenType: string,
                expiresAt: Number,
                expiresIn: Number,
                refreshToken: string,
                accessToken: string,
                athlete: SummaryAthlete) {
        this.tokenType = tokenType
        this.expiresAt = expiresAt
        this.expiresIn = expiresIn
        this.refreshToken = refreshToken
        this.accessToken = accessToken
        this.athlete = athlete
    }
}
