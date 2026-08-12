//tcp模块
let net = require('net')
//创建服务对象
let server = net.createServer()
//监听端口
server.listen(33555, () => {

})
//服务器收到东西触发
server.on('connection', (con) => {
  console.log(con.remoteAddress, con.remotePort)
  //发东西
  con.write('data')
  //收到东西触发
  con.on('data', data => {
    console.log(con.remoteAddress, 'hi', data.toString().slice(0, 100))
    con.write(data.toString().toUpperCase())
  })
  //链接断开触发
  con.on('end', () => {

  })
})


//Client
conn = net.connect(33555, '127.0.0.1')
conn.write('sfdjss')
conn.read().toString()