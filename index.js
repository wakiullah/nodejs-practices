import http from 'http'
import fs from 'node:fs/promises'
import path from 'node:path'

const serverHost = 3000
const __dirname = import.meta.dirname
const ourHtmlPath = path.join(__dirname, 'index.html')
const server = http.createServer(async (req, res) => {

    const data = await fs.readFile(ourHtmlPath, 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    res.statusCode = 200
    res.end(data)
})

server.listen(serverHost, () => {
    console.log('server in running');

})