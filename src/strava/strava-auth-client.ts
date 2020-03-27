import { STRAVA_CONFIG } from '@/strava/strava-config'
import Axios from 'axios-observable'
import { Observable, of } from 'rxjs'
import { StravaAuthResponse } from '@/strava/api/strava-auth-response'
import { catchError, map } from 'rxjs/operators'
import { Fault } from '@/strava/api/types'

const STRAVA_URL = 'https://www.strava.com'

export class StravaAuthClient {

    static postAuthorizationCode(authorizationCode: string): Observable<StravaAuthResponse> {
        return Axios.post(`${STRAVA_URL}/oauth/token?` +
            `client_id=${STRAVA_CONFIG.clientId}&` +
            `client_secret=${STRAVA_CONFIG.clientSecret}&` +
            `code=${authorizationCode}&` +
            `grant_type=authorization_code`)
            .pipe(
                map(response => StravaAuthResponse.fromJs(response.data)),
                catchError((error: Fault) => {
                    console.log(error)
                    return of(StravaAuthResponse.fromJs())
                })
            )
    }

    static authorizationUrl() {
        return `${STRAVA_URL}/oauth/authorize?` +
            `client_id=${STRAVA_CONFIG.clientId}&` +
            `client_secret=${STRAVA_CONFIG.clientSecret}&` +
            `redirect_uri=${location.href}&` +
            `scope=read&` +
            `response_type=code`;
    }

    static authorizationCodeFromUrl(): string | undefined {
        const match = RegExp('[?&]code=([^&]*)').exec(location.search);
        if (match) {
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }
        return undefined;
    }
}
