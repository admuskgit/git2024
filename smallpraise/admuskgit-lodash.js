var admuskgit = {
  //let i = 0
  parseHTML() {
    if(html[i] !== "<") {
      throw new Error('格式错误：必须以"<"开头')
    }
    i++
    let tagName = ""
    while(html[i] !== ">") {
      tagName += html[i]
      i++
    }
    i++
    let currentNode = {
      tagName: tagName,
      children: [],
    }
    while(!(html[i] == "<" && html[i + 1] == "/" && html.slice(i + 2, i + 2 + tagName.length) == tagName)) {
      if(html[i] == "<") {
        let childTag = this.parseHTML()
        currentNode.children.push(childTag)
      } else {
        let textContent = ""
        while(html[i] !== "<") {
          textContent += html[i]
          i++
        }
        currentNode.children.push({text: textContent})
      }
    }
    i += 2
    let closeTagName = ""
    while(html[i] !== ">") {
      closeTagName += html[i]
      i++
    }
    i++
    if(tagName === closeTagName) {
      return currentNode
    } else {
      throw new Error(`标签不匹配：${tagName} 与 ${closeTagName}`)
    }
  },
  //let html = "<div>1<p>2.1</p><strong>2.2<h>3</h></strong></div>"
  //let html = "<div><p>2.1</p><strong>2.2<h>3</h></strong></div>"
  //let html = "<div>hellow</div>"
  //console.log(admuskgit.parsehtml(html))
  getElementById(id) {
//
    
  },
  getElementsByName(node, tagName) {
//

  },
}