var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(request, response){
    pathName = url.parse(request.url).pathname + '.html';
    __dirname = 'html';
    fs.readFile(__dirname + pathName, function(err, data) {
        if (err) {
        response.writeHead(404, {'Content-type':'text/plain'});
        response.write('Page Was Not Found' + JSON.stringify(err));
        response.end( );
        } else {
        response.writeHead(200);
        response.write(data);
        response.end();
        } 
    });
}).listen(7000);