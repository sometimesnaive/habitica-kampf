const fetch = require("node-fetch");

const HEADERS = {
    "x-api-user": process.env.HABITICA_API_USER,
    "x-api-key":  process.env.HABITICA_API_TOKEN,
}


exports.handler = async (event, context) => {
    let data = JSON.parse(event.body);
    console.log(data);
    let hook_type = data.webhookType;
    if (hook_type == 'taskActivity') {
        if (data.task.type == "daily") {
            dailyProcessor();
        }
        else if (data.task.type == "todo") {
            if (data.direction == 'up' && data.task.completed == true && data.task.notes.includes("#repeat1")) {
                addTodo().then(d => { console.log("added new todo."); });
            }
        }
    }
    // the quest hook does not seem to work
    // else if (hook_type == 'questActivity') {
    //     if (data.type == 'questInvited') {
    //         acceptQuest().then(d => {console.log(d);});
    //     }
    //     else if (data.type == 'questStarted') {
    //         console.log('quest started');
    //     }
    //     else if (data.type == 'questFinished') {
    //         console.log('quest finished');
    //     }
    // }

    // do the work

    // return so Habitica does not wait for too long
    return {
        statusCode: 200,
        body: 'y',
    };
}

function dailyProcessor() {
    console.log('hello');
}


async function addTodo() {
    const payload = {
        "text": "my test todo",
        "type": "todo",
        "notes": "testapi",
        "priority": 2,
    };
    
    const params = {
        "method": "POST",
        "headers": {...HEADERS, 'Content-Type': 'application/json'},
        "body": JSON.stringify(payload),
        "muteHttpExceptions": true,
    };

    const url = "https://habitica.com/api/v3/tasks/user"
    const response = await fetch(url, params);
    return response.json();
}
