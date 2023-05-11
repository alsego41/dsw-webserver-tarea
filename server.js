const http = require("http")
const fs = require("node:fs/promises")

const host = "localhost"
const port = 3000

const requestListener = function (req, res) {
    if (req.method !== 'GET') {
        fileName = '/405.html'
        httpCode = 405
    } else {
        if (req.url === '/' || 
            req.url === '/home' || 
            req.url === '/home.html' || 
            req.url === '/index' ||  
            req.url === '/index.html'
        ) {
            fileName = '/index.html'
            httpCode = 200
        } else {
            fileName = '/404.html'
            httpCode = 404
        }
    }
    fs.readFile(__dirname + "/static" + fileName)
        .then(contents => {
            res.setHeader("Content-Type", "text/html")
            res.writeHead(httpCode)
            res.end(contents)
        })
        .catch(err => {
            res.writeHead(500)
            res.end("Error 500 - Algo salió mal")   
            return
        })
    fs.writeFile(__dirname + '/mycoolserver.log', 
        `${req.method}, ${req.url}, ${Date.now()}, ${httpCode}\n`)   
        .then()
        .catch(
            console.log("Error al escribir en log")
        )
}

const server = http.createServer(requestListener)
server.listen(port, host, () => {
    console.log(`Server running in http://${host}:${port}`);
})