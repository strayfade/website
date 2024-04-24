const http = require('http')
const { App } = require('./App')
const { Log } = require('./Log')

const Server = http.createServer(App)

Server.listen(process.env.PORT || '8000')

Server.on('listening', () => {
    const Address = Server.address()
    const Binding = typeof Address === 'string' ? `pipe ${Address}` : `port ${Address.port}`
    if (Address.port < 10000) {
        Log(`Listening on ${Binding}`)
        Log(`Local address (if available): http://127.0.0.1:${Address.port}`)
    }
})

module.exports = { Server }
