const http = require('http')
const { App } = require('./App')
const { Log } = require('./Log')

const Server = http.createServer(App)
if (process.argv[2])
    Server.listen(process.argv[2])
else if (process.env.PORT)
    Server.listen(process.env.PORT)
else 
    Server.listen(3000);

Server.on('listening', () => {
    const Address = Server.address()
    const Binding = typeof Address === 'string' ? `pipe ${Address}` : `port ${Address.port}`
    if (Address.port < 10000) {
        Log(`Listening on ${Binding}`)
        Log(`Local address: http://127.0.0.1:${Address.port}`)
    }
})

module.exports = { Server }
