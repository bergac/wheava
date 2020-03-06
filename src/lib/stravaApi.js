const STRAVA_URL = 'https://www.strava.com/api/v3'

const StravaApi = function(client) {
    this.client = client;
}

StravaApi.prototype.getAthlete = function() {
    return this.client.get(`${STRAVA_URL}/athlete`)
        .then(
            response => response.data,
            error => {
                console.log(error);
                return null
            })
}

export { StravaApi }
