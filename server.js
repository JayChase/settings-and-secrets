var http = require('http'),
	fs = require('fs'),
	settings = require('./source/settings')(fs,{
		rootDir: __dirname
	}),
	server = http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type' : 'text/plain'}); 
		res.end('settings: ' + JSON.stringify(settings)); 		
	});

server.listen(8080,'localhost');

console.log("Server running at http://localhost:8080/");