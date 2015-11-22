var WebSocketServer = require('websocket').server;
var http = require('http');

function World() {
    this.children = [];
}

var Server = {
    World: new World(),
    Clients: []
};


/* INIT WEB SERVER */
var httpServer = http.createServer(function (request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
    response.writeHead(200);
    response.write("You've reached the Neighbors Core HTTP Web Server!");
    response.end();

    console.log("Client Requested HTTP");
});
httpServer.listen(8080, function () {});
console.log("Core Web Server initiated.");

/* INIT SOCKET SERVER */
var socketServer = new WebSocketServer({
    httpServer: httpServer
});
console.log("Core Socket Server initiated.");
