const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar('v3');

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

/* The credential are the values required to access calendar. They are stored in the config.json file. */

const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  redirect_uris: ['https://darisam.github.io/meet/'],
  javascript_origins: ['https://darisam.github.io', 'http://localhost:3000'],
};

const { client_secret, client_id, redirect_uris, calendar_id } = credentials;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

/* getAuthURL returns a URL so that users can log in to Google and be authorized to see the calendar. */

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ authUrl: authUrl }),
  };
};

/* getAccessToken requires the user to provide an authorization code and return an access token. */

module.exports.getAccessToken = async (event) => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  const authCode = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(authCode, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => {
      return { statusCode: 200, body: JSON.stringify(token) };
    })
    .catch((err) => {
      console.error(err);
      return { statusCode: 500, body: JSON.stringify(err) };
    });
};
