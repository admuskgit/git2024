//引入TCP模块
let net = require('net')
//创建TCP服务器
let server = net.createServer()
//启动服务器并监听端口
server.listen(8080, () => {
  console.log('服务器正在监听，时间是：', new Date())
})
let messages = []
//监听客户端连接事件
server.on('connection', (con) => {
  console.log('TCP连接建立')
  //监听并接收客户端发送的数据
  con.on('data', (data) => {
    console.log('收到HTTP请求:')
    let request = data.toString()
    console.log('全部请求:', request)
    let body = request.split('\r\n\r\n')
    console.log('头部:', body[0])
    console.log('请求体:', body[1])
    let firstLine = request.split('\r\n')[0]
    let parts = firstLine.split(' ')
    let part = parts[1]
    let method = parts[0]
    let html
    let response
    if (part === '/') {
      let list = ''
      for (let item of messages) {
        list += `
        <p>${item.name}: ${item.message}</p>
        `
      }
      html = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"></head>
      <body>
        <h1>留言板</h1>
        <form method="GET" action="/message">
          <p>Name: <input type="text" name="name"></p>
          <p>Message:<br><textarea name="message"></textarea></p>
          <p><button type="submit">Send</button></p>
        </form>
        ${list}
      </body>
      </html>
      `
      response = `HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\n\r\n${html}`
    } else if (part.startsWith('/message')) {
      let query = parseQuery(part)
      messages.push({
        name: query.name,
        message: query.message,
      })
      response = `HTTP/1.1 302 Found\r\nLocation: /\r\n\r\n`
    } else {
      response = `HTTP/1.1 404 Not Found\r\n\r\nNot Found`
    }
    con.write(response)
    con.end()
  })
  //监听客户端断开连接
  con.on('end', () => { })
})
function parseQuery(part) {
  let queryString = part.split('?')[1]
  let pairs = queryString.split('&')
  let result = {}
  for (let pair of pairs) {
    let [key, val] = pair.split('=')
    result[key] = decodeURIComponent(val)
  }
  return result
}