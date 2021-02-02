const fetch = require("node-fetch");

const HEADERS = {
    "x-api-user": process.env.HABITICA_API_USER,
    "x-api-key":  process.env.HABITICA_API_TOKEN,
}

exports.handler = async (event, context) => {
    const party = await getParty();
    let resp = {};
    const quest = party.data.quest;

    if (quest.key && !quest.active && !quest.members[HEADERS['x-api-user']]) {
        const ares = await acceptQuest();
        const accept_quest_res = JSON.stringify(ares);
        resp = {
            statusCode: 200,
            body: accept_quest_res
        };
    }
    else {
        resp = {
            statusCode: 200,
            body: 'no suitable quest to add.'
        };
    }
    return resp;
}

async function acceptQuest() {
    const params = {
        "method" : "POST",
        "headers" : {...HEADERS, 'Content-Type': 'application/json'},
        "muteHttpExceptions" : true,
    }

    const url = "https://habitica.com/api/v3/groups/party/quests/accept";
    const response = await fetch(url, params);
    console.log(response);
    return response.json();
}


async function getParty() {
    const params = {
        "method" : "GET",
        "headers" : {...HEADERS, 'Content-Type': 'application/json'},
        "muteHttpExceptions" : true,
    }

    const url = "https://habitica.com/api/v3/groups/party";
    const response = await fetch(url, params);
    return response.json();
}