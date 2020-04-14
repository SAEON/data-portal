#!/usr/bin/env node
import app from '../app'
import http from 'http'
import { PORT } from '../config'

const normalizePort = (val) => {
  const port = parseInt(val, 10)
  if (isNaN(port)) return val
  if (port >= 0) return port
  return false
}

const normalizedPort = normalizePort(PORT)
app.set('port', normalizedPort)
const server = http.createServer(app)
server.listen(normalizedPort)

server.on('error', (err) => {
  if (err.syscall !== 'listen') throw err
  var bind =
    typeof normalizedPort === 'string' ? 'Pipe ' + normalizedPort : 'Port ' + normalizedPort
  switch (err.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw err
  }
})

server.on('listening', () => {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.log('Listening on ' + bind)
})
