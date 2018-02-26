"user strict";

const http = require('http');
const port = process.env.PORT || 3000;


http.get('http://www.google.com', (resp) => {
    const { statusCode } = resp;
    const contentType = resp.headers['content-type'];

    let error;
    if (statusCode !== 200) {
	error = new Error('Request Failed.\n' +
			  `Status Code: ${statusCode}`);
    }
    let rawData = '';
    resp.on('data', (chunk) => {
	rawData += chunk;
    });
    resp.on('end', () => {
	try {
	    console.log(rawData);
	} catch (e) {
	    console.log(e.message + 'suca');
	}
    });

}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
