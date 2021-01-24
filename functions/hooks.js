const fetch = require("node-fetch");

const HEADERS = {
    "x-api-user": process.env.HABITICA_API_USER,
    "x-api-key":  process.env.HABITICA_API_TOKEN,
}


exports.handler = async (event, context) => {
    let data = JSON.parse(event.body);
    console.log(data);
    
    const hooks = await getWebhooks();

    // return so Habitica does not wait for too long
    return {
        statusCode: 200,
        body: hooks,
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