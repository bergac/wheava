# wheava

## Run locally
Put the following in a new file `src/integration/strava/strava-config.ts`
```javascript
export const STRAVA_CONFIG = {
    clientId: '<YOUR_STRAVA_CLIENT_ID>'
}
```
Strava assumes you use a proxy or back end to connect with the API.
Therefore make sure your `client_secret` isn't exposed in the browser using a mock back end (see `/mock`).
Put the following in `mock/auth/strava-config.js`:
```javascript
module.exports = {
    STRAVA_CONFIG: {
        clientId: '<YOUR_STRAVA_CLIENT_ID>',
        clientSecret: '<YOUR_STRAVA_CLIENT_SECRET>'
    }
}
```
 
Then run `npm install`

### Compiles and hot-reloads for development
And start mock back end
```
npm start
```

### Compiles and minifies for production
```
npm build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
