require('dotenv').config();
const axios = require('axios').default;
const discord = require('./scripts/discord');
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID;

function getLastTweets() {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 5);
    const isoDate = date.toISOString();

    axios.get(`https://graph.facebook.com/v14.0/${FACEBOOK_PAGE_ID}/feed?fields=message%2Cfull_picture%2Ccreated_time&access_token=${FACEBOOK_ACCESS_TOKEN}&since=${isoDate}`)
        .then(response => {
            for (var i = 0; i < response.data.meta.result_count; i++) {
                discord.sendWebhook(response.data.data[i].full_picture);
            }
        });  
}

setInterval(() => { //Execute every 5 minutes
    console.log(new Date(), ': Looking for new Tweets...')
    getLastTweets();
}, 300000);