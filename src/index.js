import {oauth} from './lib/oauth.js';
import {purecss} from 'purecss';
import {StravaApi} from './lib/stravaApi';
import axios from 'axios'

const container = document.createElement('div');
container.className = 'pure-g'
const header = document.createElement('div')
header.className = 'pure-u-5-5'
header.style.backgroundColor = '#42aaf5'
header.style.height = '50px'

container.appendChild(header)
const column1 = document.createElement('div');
column1.className = 'pure-u-1-3'
const column2 = column1.cloneNode();
const column3 = column1.cloneNode();
document.body.appendChild(container)
container.appendChild(column1);
container.appendChild(column2);
container.appendChild(column3);

function loading() {
    const element = document.createElement('button');
    element.innerHTML = 'Loading..';
    element.className = 'pure-button';
    element.addEventListener('click', function () {
        oauth.getToken()
    });
    return element;
}

function athleteComponent(athlete) {
    const element = document.createElement('div');
    element.innerHTML = athlete.firstname;
    return element;
}

async function show() {
    const token = await oauth.getToken();
    if (!token) {
        column2.appendChild(loading());
    } else {
        const instance = axios.create({
            baseURL: 'https://www.strava.com/api/v3/',
            timeout: 1000,
            headers: {Authorization: `Bearer ${token}`}
        });
        const api = new StravaApi(instance);
        const athlete = await api.getAthlete();
        column2.appendChild(athleteComponent(athlete));
    }
}

show();
