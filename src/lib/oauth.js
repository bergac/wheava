import axios from 'axios';
import {STRAVA_CONFIG} from './../config/stravaconfig.js'

let token
let code

const BASE_URL = 'http://localhost:9000';
const STRAVA_URL = 'https://www.strava.com';

const oauth = {}

oauth.authenticate = function() {
    const url = `${STRAVA_URL}/oauth/authorize?` +
        `client_id=${STRAVA_CONFIG.clientId}&` +
        `client_secret=${STRAVA_CONFIG.clientSecret}&` +
        `redirect_uri=${STRAVA_CONFIG.redirectUri}&` +
        `scope=read&` +
        `response_type=code`
    location.replace(url);
}

oauth.getToken = async function () {
    if (token) {
        return token
    }
    code = getCode();
    if (code) {
        const url = `${STRAVA_URL}/oauth/token?` +
            `client_id=${STRAVA_CONFIG.clientId}&` +
            `client_secret=${STRAVA_CONFIG.clientSecret}&` +
            `code=${code}&` +
            `grant_type=authorization_code`

        token = await axios.post(url).then(
            response => response.data.access_token,
            error => {
                console.log(error);
                if (error.response.status === 400) {
                    code = undefined;
                    location.assign(BASE_URL)
                }
                return undefined;
            }
            );
        return token;
    } else {
        oauth.authenticate()
    }
    return null
}

/**
 * Get the code that is necessary to retrieve to access token.
 */
function getCode() {
    var match = RegExp('[?&]code=([^&]*)').exec(location.search);
    if (match) {
        console.log(match);
        console.log(decodeURIComponent(match[1].replace(/\+/g, ' ')))
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
}

export { oauth };
