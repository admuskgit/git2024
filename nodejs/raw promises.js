function serialasyncmap(coll, fn) {
  let res = []
  let promise = Promise.resolve()
  for (let it of coll) {
    promise = promise.then(() => {
      return fn(it).then((val) => {
        res.push(val)
      })
    })
  }
  return promise.then(() => { return res })
}
serialasyncmap([1, 2, 3, 4], function test(it) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(it)
      resolve(it)
    }, 2000);
  })
})



function co(genFn) {
  let it = genFn()
  return new Promise((resolve, reject) => {
    function step(res) {
      if (res.done) {
        resolve(res.value)
      } else {
        Promise.resolve(res.value)
          .then((val) => { try { step(it.next(val)) } catch (e) { reject(e) } })
          .catch((err) => { try { step(it.throw(err)) } catch (e) { reject(e) } })
      }
    }
    try { step(it.next()) } catch (e) { reject(e) }
  })
}