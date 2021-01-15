exports.handler = async event => {
    let dataContents = JSON.parse(event.postData.contents);
    console.log(event.postData);
    let type = dataContents.type;

    // do the work

    // return so Habitica does not wait for too long
    return {
        statusCode: 200,
        body: 'y',
    };
}