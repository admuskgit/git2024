this.addEventListener("message", (e) => {
  let data = e.data
  let re = data.re
  let string = data.string
  let matches = []
  let match = null
  while(match = re.exec(string)) {
    matches.push(match)
    if(re.global == false) {
      break
    }
  }
  postMessage(matches)
})