import { STRAVA_CONFIG } from '@/strava/strava-config'
import Axios from 'axios-observable'
import { Observable } from 'rxjs'

const STRAVA_URL = 'https://www.strava.com'
export class StravaAuthClient {

    // TODO make use of pipes and make more typesafe (i.e. map errors and stuff)
    static postAuthorizationCode(authorizationCode: string): Observable<any> {
        return Axios.post( `${STRAVA_URL}/oauth/token?` +
            `client_id=${STRAVA_CONFIG.clientId}&` +
            `client_secret=${STRAVA_CONFIG.clientSecret}&` +
            `code=${authorizationCode}&` +
            `grant_type=authorization_code`)
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
