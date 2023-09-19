const http = require('http');

// createServer function -> creates HTTP server. The callback is executed every time someone joins the server.
// req 	-> stores incoming request object
// res	-> stores the response sent by the server
const server = http.createServer((req, res) => {
	if (req.url === '/') {
		res.writeHead(200, {'content-type': 'text/html'});
		res.write('<h1>hello world</h1>');
		res.end();
	} else if (req.url === '/about') {
		res.end('About page');
	} else if (req.url === '/contact') {
		res.end('Contact page');
   } else if (req.url === '/helloworld') {
		res.end('Hello World');
   } else {
		res.end('404, Resource not found');
	}
})

// listen() starts the server and binds it to a port. The callback function is executed when
// the server starts listening on the specified port.
server.listen(5000, () => {
	console.log('Server listening on port 5000');
})
