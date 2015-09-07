var http = require('http'),
	fs = require('fs'),
	settings = require('./settings')(fs),
	server = http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type' : 'text/plain'}); 
		res.end('settings: ' + JSON.stringify(settings)); 		
	});

server.listen(8080,'localhost');

console.log("Server running at http://localhost:8080/");