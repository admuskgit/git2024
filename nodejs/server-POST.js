let net = require('net')
let server = net.createServer()
server.listen(8080, () => { })
let messages = []
server.on('connection', (con) => {
  con.on('data', (data) => {
    let request = data.toString()
    let firstLine = request.split('\r\n')[0]
    let parts = firstLine.split(' ')
    let part = parts[1]
    let method = parts[0]
    let html
    let response
    let objURL = new URL(`http://localhost:8080${part}`)
    let pathname = objURL.pathname
    if (method === 'GET' && pathname === '/') {
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
        <form method="POST" action="/message">
          <p>Name: <input type="text" name="name"></p>
          <p>Message:<br><textarea name="message"></textarea></p>
          <p><button type="submit">Send</button></p>
        </form>
        ${list}
      </body>
      </html>
      `
      response = `HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\n\r\n${html}`
    } else if (method === 'POST' && pathname === '/message') {
      let body = request.split('\r\n\r\n')[1]
      let query = parseQuery('/message?' + body)
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