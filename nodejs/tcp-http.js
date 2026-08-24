let net = require('net')
let server = net.createServer()
server.listen(33555, () => { })
server.on('connection', (con) => {
  con.write('data')
  con.on('data', data => {
    con.write(data.toString().toUpperCase())
  })
  con.on('end', () => { })
})
conn = net.connect(33555, '127.0.0.1')
conn.write('sfdjss')
conn.read().toString()