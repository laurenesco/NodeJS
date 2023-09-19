const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('./GitHubIOTestPage/index.html');

const server = http.createServer((req, res) => {
	const url = req.url;

	if (url === '/') {
		res.writeHead(200, {'content-type': 'text/html'});
		res.write(html);
		res.end();
	}
})

server.listen(5000, () => {
	console.log('Listening on port 5000');
})
