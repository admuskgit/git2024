function ajax(method, path, header, body = '', callback) {
  var req = new XMLHttpRequest()
  req.open("method", path, true)
  for (let key in header) {
    req.setRequestHeader(key, header[key])
  }
  req.onload = function () {
    let data = JSON.parse(req.responseText)
    callback(data)
  }
  req.send(null)
  //req.send(body)
}
//ajax("GET", "/user", {}, "", function(data){console.log(data)})
//path = "https://api.ipify.org/"