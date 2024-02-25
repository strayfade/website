const http = require('http')
const { App } = require('./App')
const { Log } = require('./Log')

const Server = http.createServer(App)

Server.listen(process.env.PORT || parseInt(process.argv[2]) || '8000')

Server.on('listening', () => {
    const Address = Server.address()
    const Binding = typeof Address === 'string' ? `pipe ${Address}` : `port ${Address.port}`
    Log(`Listening on ${Binding}`)
    Log(`Local address (if available): http://127.0.0.1:${Address.port}`)
})

module.exports = { Server }
