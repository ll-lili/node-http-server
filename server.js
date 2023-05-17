const http = require('http')
const serverhandle = require('./app')

const server = http.createServer(serverhandle)
const PORT = 3001
console.log(process.env.NODE_ENV)
server.listen(PORT, () => {
  console.log('server runing:' + PORT)
})
