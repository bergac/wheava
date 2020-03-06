# WHEAVA

Integrate your Strava activities with actual whether information.

## Getting started
Make sure you have an app defined in your Strava account.  
Copy the code below in `src/config/stravaconfig.js`

```javascript
export const STRAVA_CONFIG = {
    clientId: <your_strava_client_id>,
    clientSecret: <your_strava_client_secret>,
    redirectUri: 'http://localhost:9000' // base url of your app
}
export { STRAVA_CONFIG }
```

To run a local dev server: `yarn dev`
