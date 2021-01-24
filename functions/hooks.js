const fetch = require("node-fetch");

const HEADERS = {
    "x-api-user": process.env.HABITICA_API_USER,
    "x-api-key":  process.env.HABITICA_API_TOKEN,
}


exports.handler = async (event, context) => {
    if (event.queryStringParameters) {
        if (event.queryStringParameters.enable == 'true') {
            callApi(
                'https://habitica.com/api/v3/user/webhook',
                {
                    "enabled": true,
                    "url": "https://eloquent-wozniak-5a5cc0.netlify.app/.netlify/functions/hello",
                    "label": "My Quest Webhook",
                    "type": "questActivity",
                    "options": { // set at least one to true
                    "questStarted": true,  // default
                    "questFinished": true, // default
                    "questInvited": true,  // default
                    }
                },
            ); 
        }

    }
    const hooks = await getWebhooks();
    // return so Habitica does not wait for too long
    return {
        statusCode: 200,
        body: JSON.stringify(hooks, null, 2) + JSON.stringify(event.queryStringParameters),
    };
}

async function getWebhooks() {
    const params = {
        "method" : "GET",
        "headers" : {...HEADERS, 'Content-Type': 'application/json'},
        "muteHttpExceptions" : true,
    }

    const url = "https://habitica.com/api/v3/user/webhook";
    const response = await fetch(url, params);
    return response.json();
}

async function callApi(url, data, method='POST') {
    const params = {
        "method" : method,
        "headers" : {...HEADERS, 'Content-Type': 'application/json'},
        "body": JSON.stringify(data),
        "muteHttpExceptions" : true,
    };

    const response = await fetch(url, params);
    return response.json();
}