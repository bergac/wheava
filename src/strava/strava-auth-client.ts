import { STRAVA_CONFIG } from '@/strava/strava-config'
import { Observable, of } from 'rxjs'
import { StravaAuthResponse } from '@/strava/api/strava-auth-response'
import { catchError, map } from 'rxjs/operators'
import { Fault } from '@bergac/strava-v3-ts-axios'
import { fromPromise } from 'rxjs/internal-compatibility'
import Axios from 'axios'

const STRAVA_URL = 'https://www.strava.com'

export class StravaAuthClient {

    static postAuthorizationCode(authorizationCode: string): Observable<StravaAuthResponse | Fault> {
        return fromPromise(Axios.post(`${STRAVA_URL}/oauth/token?` +
            `client_id=${STRAVA_CONFIG.clientId}&` +
            `client_secret=${STRAVA_CONFIG.clientSecret}&` +
            `code=${authorizationCode}&` +
            `grant_type=authorization_code`))
            .pipe(
                map(response => StravaAuthResponse.fromJs(response.data)),
                catchError((error: Fault) => of(error))
            )
    }

    static authorizationUrl() {
        return `${STRAVA_URL}/oauth/authorize?` +
            `client_id=${STRAVA_CONFIG.clientId}&` +
            `redirect_uri=${location.href}&` +
            `scope=activity:read_all&` +
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
