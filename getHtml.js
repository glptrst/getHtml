"user strict";

const http = require('http');
const https = require('https');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Add error listener
    req.on('error', (err) => {
	console.log(err);
	res.statusCode = 400;
	res.end();
    });

    if (req.method === 'GET') {
	if (req.url === '/') {
	    getPage('https://www.google.com', res);
	} else {
	    res.statusCode = 404;
	    res.end('error');
	}
    } else {
	res.statusCode = 404;
	res.end('error');
    }
});

function getPage (url, handle) {
    https.get(url, (res) => {
	const { statusCode } = res;
	const contentType = res.headers['content-type'];

	let error;
	if (statusCode !== 200) {
	    error = new Error('Request Failed.\n' +
			      `Status Code: ${statusCode}`);
	}
	let rawData = '';
	res.on('data', (chunk) => {
	    rawData += chunk;
	});
	res.on('end', () => {
	    try {
		console.log(rawData);
		handle.statusCode = 200;
		handle.setHeader('Content-type', 'text/html');
		handle.end(rawData);
		// return(rawData);
	    } catch (e) {
		console.error(e.message);
		// return e.message;
	    }
	});
    }).on('error', (e) => {
	console.error(`Got error: ${e.message}`);
    });

};

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
