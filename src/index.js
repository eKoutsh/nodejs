var http = require('http');
// var log = require('./modules/mylog');
var url = require('url');
var querystring = require('querystring');
var {info, error} = require('./modules/mylog');

var {countries} = require('countries-list');

var server = http.createServer(function(request, response) {
    var parsed = url.parse(request.url);
    console.log(parsed);

    var pathname = parsed.pathname;

    var query = querystring.parse(parsed.query);
    console.log("QUERY:", query);

    if (pathname == '/') {
        response.writeHead(200, {'Content-Type':"text/html"});
        response.write('<html><body><p>Hello</p></body></html>')
        response.end();
    }
    else if (pathname == '/exit') {
        response.writeHead(200, {'Content-Type':"text/html"});
        response.write('<html><body><p>Bye</p></body></html>')
        response.end();
    }
    else if (pathname == '/info') {
        var result = info(pathname);
        response.writeHead(200, {'Content-Type':"text/html"});
        response.write(result)
        response.end();
    }
    else if (pathname == '/country') {
        response.writeHead(200, {'Content-Type':"application/json"});
        response.write(JSON.stringify(countries[query.code]))
        response.end();
    }
    else if (pathname == '/error') {
        var result = error(pathname);
        response.writeHead(200, {'Content-Type':"text/html"});
        response.write(result);
        response.end();
    }
    else {
        response.writeHead(404, {'Content-Type':"text/html"});
        response.write('<html><body><p>Not found</p></body></html>')
        response.end();
    }
    
});

server.listen(5000);
console.log("running on 5000");