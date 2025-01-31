const http = require('http')
const { app } = require('./app')
const { log } = require('./log')

const server = http.createServer(app)
let port = 3000;
if (process.argv[2])
    port = process.argv[2]
else if (process.env.PORT)
    port = process.env.PORT
else 
    port = 3000
server.listen(port)

server.on('listening', () => {
    const Address = server.address()
    const Binding = typeof Address === 'string' ? `pipe ${Address}` : `port ${Address.port}`
    if (Address.port < 10000) {
        log(`Listening on ${Binding}`)
        log(`Local address: http://127.0.0.1:${Address.port}`)
    }

    require('./runTests').runTests(port)
})

module.exports = { server }
