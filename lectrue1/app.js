//creating server from node server - as protocol create app.js or server.js
//http: launch a server , send request 
//https://launch ssl server
//fs: 
const http = require('http'); //  for local we can type ./

const routes = require('./route');

// function rqListener(req, res) {

// }
// http.createServer(rqListener);//request listener will execute for every request
// //can use this 
// http.createServer(function (req, res) {

// });

const server = http.createServer(routes.handler);
console.log(routes.someText);
server.listen(3000);//3000 is port no we use to raise request

