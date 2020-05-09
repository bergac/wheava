import { STRAVA_CONFIG } from '@/strava/strava-config'
import { Observable, of } from 'rxjs'
import { StravaAuthResponse } from '@/strava/api/strava-auth-response'
import { catchError, filter, map } from 'rxjs/operators'
import { Fault } from '@bergac/strava-v3-ts-axios'
import { fromPromise } from 'rxjs/internal-compatibility'
import Axios from 'axios'

const STRAVA_URL = 'https://www.strava.com'

export class StravaAuthClient {

    static postAuthorizationCode(authorizationCode: string): Observable<StravaAuthResponse | Fault> {
        return fromPromise(Axios.post(`/oauth/token?` +
            `client_id=${STRAVA_CONFIG.clientId}&` +
            `authorization_code=${authorizationCode}`
        ))
            .pipe(
                map(response => StravaAuthResponse.fromJs(response.data)),
                filter(response => !!response.accessToken && !!response.athlete),
                catchError((error: Fault) => of(error))
            )
    }

    static authorizationUrl() {
        const redirectUri = `${location.origin}/login`
        return `${STRAVA_URL}/oauth/authorize?` +
            `client_id=${STRAVA_CONFIG.clientId}&` +
            `redirect_uri=${redirectUri}&` +
            `scope=activity:read_all&` +
            `response_type=code`;
    }
}
