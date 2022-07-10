require('dotenv').config();
const axios = require('axios').default;
var CronJob = require('cron').CronJob;
const { sendWebhook } = require('./scripts/discord');
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;

function getLastFacebookPost() {
    const date = new Date();
    date.setHours(date.getHours() - 1);
    const isoDate = date.toISOString();
    const url = `https://graph.facebook.com/v14.0/${FACEBOOK_PAGE_ID}/feed?fields=message%2Cfull_picture%2Ccreated_time&access_token=${FACEBOOK_ACCESS_TOKEN}&since=${isoDate}`;

    axios.get(url)
        .then(response => {
            for (var i = 0; i < response.data.data.length; i++) {
                sendWebhook(response.data.data[i].full_picture);
            }
        });  
}

//Execute every 1 hour
var job = new CronJob('0 */1 * * *', function() {
    console.log(new Date(), ': Looking for new Tweets...')
    getLastFacebookPost();
});

console.log(new Date(), ': Starting Cron Job...');
job.start();
