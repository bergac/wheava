const STRAVA_CONFIG = require('./strava-config').STRAVA_CONFIG;

const axios = require('axios');

const STRAVA_URL = 'https://www.strava.com';

exports.getToken = function (req, res) {
    const authorizationCode = req.query.authorization_code;

    if (req.query.client_id === STRAVA_CONFIG.clientId) {
        console.log('retrieving token');
        axios.post(`${STRAVA_URL}/oauth/token?` +
            `client_id=${STRAVA_CONFIG.clientId}&` +
            `client_secret=${STRAVA_CONFIG.clientSecret}&` +
            `code=${authorizationCode}&` +
            `grant_type=authorization_code`)
            .then(result => {
                console.log(result.data)
                res.status(200)
                res.send(result.data)
            })
            .catch(error => {
                console.log(error)
                res.status(error.response.status)
                res.send(error.response.data)
            });
    } else {
        console.log('invalid client id');
        res.status(400);
        res.send();
    }
}
