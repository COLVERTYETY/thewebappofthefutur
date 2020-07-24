var http = require('http');
var fs = require('fs');


var server = http.createServer(function (request, response) {
    switch (request.url) {
        case "/index.css" :
            response.writeHead(200, {"Content-Type": "text/css"});
            var csss = fs.readFileSync("./index.css");
            response.write(csss);
            break;
        case "/trippyspace.gif" :
            response.writeHead(200, {"Content-Type": "text/css"});
            var giff = fs.readFileSync("./trippyspace.gif");
            response.write(giff);
            break;
        default :    
            response.writeHead(200, {"Content-Type": "text/html"});
            var htmll =fs.readFileSync("./client.html")
            response.write(htmll);
    };
    response.end();
});


// Loading socket.io
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('msg',function(msg){
        io.sockets.emit('rmsgs',msg);
        console.log(msg);
    });
  });

server.listen(8080);