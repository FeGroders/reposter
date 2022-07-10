require('dotenv').config();
const axios = require('axios').default;
const WEBHOOK_URL = process.env.URL_WEBHOOK_DISCORD;
const URL_TITLE = process.env.URL_TITLE;
const URL_TIKTOK = process.env.URL_TIKTOK;
const URL_YOUTUBE = process.env.URL_YOUTUBE;
const URL_INSTAGRAM = process.env.URL_INSTAGRAM;
const URL_FACEBOOK = process.env.URL_FACEBOOK;
const URL_TWITTER = process.env.URL_TWITTER;
const WEBHOOK_USERNAME = process.env.WEBHOOK_USERNAME;
const WEBHOOK_AVATAR_URL = process.env.WEBHOOK_AVATAR_URL;

function sendWebhook(imageUrl) {
    console.log(new Date(), ': Sending webhook...');
    if (imageUrl != ''){
        axios.post(WEBHOOK_URL, {
            content: null,
            embeds: [
            {
                title: 'Novo post!',
                description: 'Você pode nos acompanhar aqui também:',
                url: URL_TITLE,
                color: 0,
                fields: [
                {
                    name: 'TikTok',
                    value: URL_TIKTOK,
                    inline: true
                    },
                    {
                    name: 'Twitter',
                    value: URL_TWITTER,
                    inline: true
                    },
                    {
                    name: 'Facebook',
                    value: URL_FACEBOOK,
                    inline: true
                    },
                    {
                    name: 'Instagram',
                    value: URL_INSTAGRAM,
                    inline: true
                    },
                    {
                    name: 'Youtube',
                    value: URL_YOUTUBE,
                    inline: true
                    }
                    ],
                image: {
                url: imageUrl
                    }
                }
                ],
            username: WEBHOOK_USERNAME,
            avatar_url: WEBHOOK_AVATAR_URL,
            attachments: []
            }).then(response => {
                console.log(new Date(), ': Webhook sent!');
            });   
    }
}

module.exports = { sendWebhook };