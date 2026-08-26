function ajax(method, path, header, boay = '') {
  var req = new XMLHttpRequest()
  req.open("GET", "https://api.ipify.org/", false)
  req.send(null)
  console.log(req.responseText)
}
//path = "https://api.ipify.org/"