const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {

        res.write('<html>');
        res.write('<head> <title> Enter Message </title></head>');
        res.write('<body> <form action="/message" method ="POST"> <input type="text" name="message" ><button type="submit">Send</button></input></form></body');
        res.write('</html>');
        return res.end();
    };
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString(); //returns key value pair
            const message = parseBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
            // file writing has 2 method async and sync . If file is large then it will block everything . writeFileSync is basically sync

        });



    };
    // console.log(req.url, req.method, req.headers);//handling request and use 
    // process.exit(); exits event loop and program shuts down. we typically doesnot use process.exit
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head> <title> Enter Message </title></head>');
    res.write('<body><h1>Hello from node JS</h1></body');
    res.write('</html>');
    res.end();
    // this point node will sent response to client hence nothing to write anything written below will not be executed

};

//exports whatever varialble you want
// module.exports = requestHandler;
//other method of export

// module.exports = {
//     handler: requestHandler,
//     someText: 'Lavi Rastogi'
// }

//other way
exports.handler = requestHandler;
exports.someText = 'yashu rastogi';