require('dotenv').config();
// import { sendWebhook } from './scripts/discord'
const axios = require('axios').default;
const discord = require('./scripts/discord');

const TWITTER_USERNAME = process.env.TWITTER_USERNAME;
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

const config = {
    headers: { 'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}` }
};

function getLastTweets() {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 5);
    const isoDate = date.toISOString();

    axios.get(`https://api.twitter.com/2/tweets/search/recent?query=from:${TWITTER_USERNAME}&start_time=${isoDate}&expansions=attachments.media_keys&media.fields=url,preview_image_url`, config)
        .then(response => {
            var imageUrl = '';
            if (response.data.meta.result_count == 0 || !response.data.hasOwnProperty('includes')) {
              return;
            }
            for (var i = 0; i < response.data.meta.result_count; i++) {
                if (response.data.includes.media[i].hasOwnProperty('url')) {
                    imageUrl = response.data.includes.media[i].url;
                } else if (response.data.includes.media[i].hasOwnProperty('preview_image_url')) {
                    imageUrl = response.data.includes.media[i].preview_image_url;
                }
                if (imageUrl) {
                    console.log('Sending post..');
                    discord.sendWebhook(imageUrl);
                }
            }
        });    
}

setInterval(() => { //Execute every 5 minutes
    console.log(new Date(), ': Looking for new Tweets...')
    getLastTweets();
}, 300000);