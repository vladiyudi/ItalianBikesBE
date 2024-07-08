const { google } = require('googleapis');

// Set up Google Calendar API credentials
const credentials = {
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
    redirect_uris: ['YOUR_REDIRECT_URI'],
};

// Create an OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uris[0]
);

// Set the access token
oAuth2Client.setCredentials({
    access_token: 'YOUR_ACCESS_TOKEN',
    refresh_token: 'YOUR_REFRESH_TOKEN',
});

// Get the current date
const today = new Date();

// Set the start date to today
today.setHours(0, 0, 0, 0);

// Set the end date to tomorrow
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

// Retrieve events from Google Calendar
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
calendar.events.list(
    {
        calendarId: 'primary',
        timeMin: today.toISOString(),
        timeMax: tomorrow.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    },
    (err, res) => {
        if (err) {
            console.error('Error retrieving events:', err);
            return;
        }

        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming events:');
            events.forEach((event) => {
                const start = event.start.dateTime || event.start.date;
                console.log(`${start} - ${event.summary}`);
            });
        } else {
            console.log('No upcoming events found.');
        }
    }
);