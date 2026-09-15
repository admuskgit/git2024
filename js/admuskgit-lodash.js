var admuskgit = {
  chunk(array, size) {
    var result = []
    for (var i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  },
  compact(array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        result.push(array[i])
      }
    }
    return result
  },
  difference(array) {
    var res = []
    var values = []
    for (var i = 1; i < arguments.length; i++) {
      var arr = arguments[i]
      for (var j = 0; j < arr.length; j++) {
        values.push(arr[j])
      }
    }
    for (var i = 0; i < array.length; i++) {
      var f = false
      for (var j = 0; j < values.length; j++) {
        if (array[i] === values[j]) {
          f = true
          break
        }
      }
      if (!f) {
        res.push(array[i])
      }
    }
    return res
  },
  fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },
  drop(array, n = 1) {
    let res = []
    for (let i = n; i < array.length; i++) {
      res.push(array[i])
    }
    return res
  },
  iteratee(predicate) {
    if (typeof predicate === "function") {
      return predicate
    }
    if (Array.isArray(predicate)) {
      let key = predicate[0]
      let val = predicate[1]
      return function (obj) {
        return obj[key] === val
      }
    }
    if (typeof predicate === "object" && predicate !== null) {
      let entries = Object.entries(predicate);
      return function (obj) {
        return entries.every(function ([k, v]) {
          return obj[k] === v
        })
      }
    }
    if (typeof predicate === "string") {
      return function (obj) {
        return obj[predicate]
      }
    }
    return function (obj) {
      return obj
    }
  },
  identity(value) {
    return value
  },
  findIndex(array, predicate = identity, fromIndex = 0) {
    predicate = this.iteratee(predicate)
    for (let i = fromIndex; i < array.length; i++) {
      if (predicate(array[i])) {
        return i
      }
    }
    return -1
  },
  findLastIndex(array, predicate = identity, fromIndex = array.length - 1) {
    predicate = this.iteratee(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      if (predicate(array[i])) {
        return i
      }
    }
    return -1
  },
  flatten(array) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (Array.isArray(item)) {
        res.push(...item)
      } else {
        res.push(item)
      }
    }
    return res
  },
  flattenDeep(array) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (Array.isArray(item)) {
        res.push(...this.flattenDeep(item))
      } else {
        res.push(item)
      }
    }
    return res
  },
  flattenDepth(array, depth = 1) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      if (Array.isArray(item) && depth > 0) {
        res.push(...this.flattenDepth(item, depth - 1))
      } else {
        res.push(item)
      }
    }
    return res
  },
  fromPairs(pairs) {
    let obj = {}
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i]
      let key = pair[0]
      let val = pair[1]
      obj[key] = val
    }
    return obj
  },
  head(array) {
    if (!Array.isArray(array)) return undefined
    return array[0]
  },
  indexOf(array, value, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  },
  lastIndexOf(array, value, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  },
  initial(array) {
    let res = []
    for (let i = 0; i < array.length - 1; i++) {
      res.push(array[i])
    }
    return res
  },
  join(array, separator = ',') {
    let res = ''
    for (let i = 0; i < array.length; i++) {
      res += array[i]
      if (i !== array.length - 1) {
        res += separator
      }
    }
    return res
  },
  last(array) {
    return array.length ? array[array.length - 1] : undefined
  },
  pull(array, values) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 1; j < arguments.length; j++) {
        if (array[i] === arguments[j]) {
          array.splice(i, 1)
          i--
          break
        }
      }
    }
    return array
  },
  reverse(array) {
    let left = 0
    let right = array.length - 1
    while (left < right) {
      let temp = array[left]
      array[left] = array[right]
      array[right] = temp
      left++
      right--
    }
    return array
  },
  every(collection, predicate = identity) {
    predicate = this.iteratee(predicate)
    if (collection === null) {
      return true
    }
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        if (!predicate(collection[i], i, collection)) {
          return false
        }
      }
    } else {
      for (let key in collection) {
        if (!predicate(collection[key], key, collection)) {
          return false
        }
      }
    }
    return true
  },
  some(collection, predicate = identity) {
    predicate = this.iteratee(predicate)
    if (collection === null) {
      return false
    }
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i], i, collection)) {
          return true
        }
      }
    } else {
      for (let key in collection) {
        if (predicate(collection[key], key, collection)) {
          return true
        }
      }
    }
    return false
  },
  countBy(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    let obj = {}
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        let k = iteratee(collection[i], i, collection)
        if (obj[k]) {
          obj[k]++
        } else {
          obj[k] = 1
        }
      }
    } else {
      for (let key in collection) {
        let k = iteratee(collection[key], key, collection)
        if (obj[k]) {
          obj[k]++
        } else {
          obj[k] = 1
        }
      }
    }
    return obj
  },
  groupBy(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    let obj = {}
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        let key = iteratee(collection[i], i, collection)
        if (!obj[key]) {
          obj[key] = []
        }
        obj[key].push(collection[i])
      }
    } else {
      for (let key in collection) {
        let key = iteratee(collection[key], key, collection)
        if (!obj[key]) {
          obj[key] = []
        }
        obj[key].push(collection[key])
      }
    }
    return obj
  },
  keyBy(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    let obj = {}
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        let key = iteratee(collection[i], i, collection)
        obj[key] = collection[i]
      }
    } else {
      for (let key in collection) {
        let key = iteratee(collection[key], key, collection)
        obj[key] = collection[key]
      }
    }
    return obj
  },
  forEach(collection, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iteratee(collection[i], i, collection)
      }
    } else {
      for (let key in collection) {
        iteratee(collection[key], key, collection)
      }
    }
    return collection
  },
  map(collection, iteratee = identity) {
    let array = []
    iteratee = this.iteratee(iteratee)
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        array.push(iteratee(collection[i], i, collection))
      }
    } else {
      for (let key in collection) {
        array.push(iteratee(collection[key], key, collection))
      }
    }
    return array
  },
  filter(collection, predicate = identity) {
    predicate = this.iteratee(predicate)
    let res = []
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        if (predicate(collection[i], i, collection)) {
          res.push(collection[i])
        }
      }
    } else {
      for (let key in collection) {
        if (predicate(collection[key], key, collection)) {
          res.push(collection[key])
        }
      }
    }
    return res
  },
  reduce(collection, iteratee = identity, accumulator) {
    let res = accumulator
    iteratee = this.iteratee(iteratee)
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        res = iteratee(res, collection[i], i, collection)
      }
    } else {
      for (let key in collection) {
        res = iteratee(res, collection[key], key, collection)
      }
    }
    return res
  },
  reduceRight(collection, iteratee = identity, accumulator) {
    let res = accumulator
    iteratee = this.iteratee(iteratee)
    if (Array.isArray(collection)) {
      for (let i = collection.length - 1; i >= 0; i--) {
        res = iteratee(res, collection[i], i, collection)
      }
    } else {
      let keys = Object.keys(collection)
      for (let i = keys.length - 1; i >= 0; i--) {
        let key = keys[i]
        res = iteratee(res, collection[key], key, collection)
      }
    }
    return res
  },
  size(collection) {
    if (collection === null) {
      return 0
    }
    if (Array.isArray(collection)) {
      return collection.length
    }
    if (typeof collection === "object" && collection !== null) {
      let keys = Object.keys(collection)
      return keys.length
    }
    if (typeof collection === "string") {
      return collection.length
    }
    return 0
  },
  sortBy(collection, iteratees = identity) {
    if (!Array.isArray(collection)) {
      collection = [collection]
    }
    iteratees = iteratees.map(it => this.iteratee(it))
    let indexed = collection.map((item, index) => ({ item, index }))
    indexed.sort((a, b) => {
      for (let f of iteratees) {
        let valA = f(a.item)
        let valB = f(b.item)
        if (valA < valB) {
          return -1
        }
        if (valA > valB) {
          return 1
        }
      }
      return a.index - b.index
    })
    return indexed.map(({ item }) => item)
  },
  sample(collection) {
    if (Array.isArray(collection)) {
      let randomIndex = Math.floor(Math.random() * collection.length)
      return collection[randomIndex]
    } else {
      let values = Object.values(collection)
      let randomIndex = Math.floor(Math.random() * values.length)
      return values[randomIndex]
    }
  },
  isUndefined(value) {
    return value === undefined
  },
  isNull(value) {
    return value === null
  },
  isNil(value) {
    return value === null || value === undefined
  },
  max(array) {
    if (array.length === 0) {
      return undefined
    }
    let max = array[0]
    for (let i = 0; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i]
      }
    }
    return max
  },
  min(array) {
    if (array.length === 0) {
      return undefined
    }
    let min = array[0]
    for (let i = 0; i < array.length; i++) {
      if (array[i] < min) {
        min = array[i]
      }
    }
    return min
  },
  maxBy(array, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    let maxitem
    let maxvalue = -Infinity
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      let value = iteratee(item)
      if (value > maxvalue) {
        maxvalue = value
        maxitem = item
      }
    }
    return maxitem
  },
  minBy(array, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    if (!array || array.length === 0) {
      return undefined
    }
    let minitem = array[0]
    let minvalue = iteratee(array[0])
    for (let i = 1; i < array.length; i++) {
      let item = array[i]
      let value = iteratee(item)
      if (value < minvalue) {
        minvalue = value
        minitem = item
      }
    }
    return minitem
  },
  round(number, precision = 0) {
    let n = number * (10 ** precision)
    n = Math.round(n)
    return n / (10 ** precision)
  },
  sumBy(array, iteratee = identity) {
    iteratee = this.iteratee(iteratee)
    if (!array || array.length === 0) {
      return undefined
    }
    let sum = 0
    for (let i = 0; i < array.length; i++) {
      let item = array[i]
      let value = iteratee(item)
      sum += value
    }
    return sum
  },
  flatMap(collection, iteratee = identity) {
    let res = []
    iteratee = this.iteratee(iteratee)
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        let value = iteratee(collection[i], i, collection)
        for (let item of value) {
          res.push(item)
        }
      }
    } else {
      for (let key in collection) {
        let value = iteratee(collection[key], key, collection)
        for (let item of value) {
          res.push(item)
        }
      }
    }
    return res
  },
  flattenDepth(array, depth = 1) {
    let res = []
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i]) && depth > 0) {
        let flat = this.flattenDepth(array[i], depth - 1)
        for (let v of flat) {
          res.push(v)
        }
      } else {
        res.push(array[i])
      }
    }
    return res
  },
  flatMapDepth(collection, iteratee = identity, depth = 1) {
    let res = []
    iteratee = this.iteratee(iteratee)
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        let value = iteratee(collection[i], i, collection)
        res.push(value)

      }
    } else {
      for (let key in collection) {
        let value = iteratee(collection[key], key, collection)
        res.push(value)
      }
    }
    return this.flattenDepth(res, depth)
  },
  get(object, path, defaultValue) {
    if (typeof path === 'string') {
      path = path.replace(/\[(\d+)\]/g, '.$1').split('.')
    }
    let res = object
    for (let i = 0; i < path.length; i++) {
      if (res == null) {
        return defaultValue
      }
      res = res[path[i]]
    }
    return res === undefined ? defaultValue : res
  },
  has(object, path) {
    if (typeof path === 'string') {
      path = path.replace(/\[(\d+)\]/g, '.$1').split('.')
    }
    let res = object
    for (let i = 0; i < path.length; i++) {
      if (res == null) {
        return false
      }
      res = res[path[i]]
    }
    return true
  },
  mapKeys(object, iteratee = identity) {
    let obj = {}
    iteratee = this.iteratee(iteratee)
    for (let key in object) {
      let keys = iteratee(object[key], key, object)
      obj[keys] = object[key]
    }
    return obj
  },
  mapValues(object, iteratee = identity) {
    let obj = {}
    iteratee = this.iteratee(iteratee)
    for (let key in object) {
      let values = iteratee(object[key], key, object)
      obj[key] = values
    }
    return obj
  },
  range(start = 0, end, step = 1) {
    let arr = []
    if (end === undefined) {
      end = start
      start = 0
    }
    if (step === undefined) {
      step = start < end ? 1 : -1
    }
    if (step > 0) {
      for (let i = start; i < end; i += step) {
        arr.push(i)
      }
    } else if (step < 0) {
      for (let i = start; i > end; i += step) {
        arr.push(i)
      }
    }
    if (step === 0) {
      for (let i = start; i < end; i++) {
        arr.push(start)
      }
    }
    return arr
  },
  stringifyJSON(value) {
    if (value === null) {
      return 'null'
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      return `${value}`
    }
    if (typeof value === 'string') {
      return `"${value}"`
    }
    if (Array.isArray(value)) {
      let str = '['
      for (let i = 0; i < value.length; i++) {
        let s = this.stringifyJSON(value[i])
        str += (s === undefined ? 'null' : s)
        if (i < value.length - 1) {
          str += ","
        }
      }
      str += ']'
      return str
    }
    if (typeof value === 'object' && value !== null) {
      let pairs = []
      for (let key in value) {
        let val = value[key]
        let s = this.stringifyJSON(val)
        if (s !== undefined) {
          pairs.push(`"${key}":${s}`)
        }
      }
      return `{${pairs.join(',')}}`
    }
    return undefined
  },
  concat(array, values) {
    let res = []
    for (let j = 0; j < array.length; j++) {
      res.push(array[j])
    }
    for (let i = 1; i < arguments.length; i++) {
      let val = arguments[i]
      if (Array.isArray(val)) {
        for (let k = 0; k < val.length; k++) {
          res.push(val[k])
        }
      } else {
        res.push(val)
      }
    }
    return res
  },
  isEqual(value, other) {
    if (value === other) {
      return true
    }
    if (typeof value !== 'object' || typeof other !== 'object' || value == null || other == null) {
      return false
    }
    let valuekeys = 0
    let otherkeys = 0
    for (let key in value) {
      valuekeys++
      if (!(key in other) || !this.isEqual(value[key], other[key])) {
        return false
      }
    }
    for (let key in other) {
      otherkeys++
    }
    return valuekeys === otherkeys
  },
  repeat(string = '', n = 1) {
    let res = ''
    for (let i = 0; i < n; i++) {
      res += string
    }
    return res
  },
  padStart(string = '', length = 0, chars = ' ') {
    if (string.length === length) {
      return string
    }
    chars = chars === undefined ? ' ' : String(chars)
    let need = length - string.length
    let pad = chars.repeat(Math.ceil(need / chars.length))
    if (string.length > length) {
      return string.slice(0, length)
    } else {
      return pad.slice(0, need) + string
    }
  },
  padEnd(string = '', length = 0, chars = ' ') {
    if (string.length === length) {
      return string
    }
    chars = chars === undefined ? ' ' : String(chars)
    let need = length - string.length
    let pad = chars.repeat(Math.ceil(need / chars.length))
    if (string.length > length) {
      return string.slice(string.length - length, length)
    } else {
      return string + pad.slice(0, need)
    }
  },
  pad(string = '', length = 0, chars = ' ') {
    if (string.length === length) {
      return string
    }
    chars = chars === undefined ? ' ' : String(chars)
    let need = length - string.length
    let pad = chars.repeat(Math.ceil(need / chars.length))
    return pad.slice(0, Math.floor(need / 2)) + string + pad.slice(0, Math.ceil(need / 2))
  },
  keys(object) {
    let res = []
    for (let key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        res.push(key)
      }
    }
    return res
  },
  values(object) {
    let res = []
    for (let key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        res.push(object[key])
      }
    }
    return res
  },
  random(lower = 0, upper = 1, floating) {
    if (lower > upper) {
      [lower, upper] = [upper, lower]
    }
    if (floating || lower % 1 !== 0 || upper % 1 !== 0) {
      return Math.random() * (upper - lower) + lower
    }
    return Math.floor(Math.random() * (upper - lower + 1)) + lower
  },
  round(number, precision = 0) {
    return Math.floor(number * (10 ** precision) + 0.5) / (10 ** precision)
  },
  ceil(number, precision = 0) {
    return Math.floor(number * (10 ** precision) + 1) / (10 ** precision)
  },
  floor(number, precision = 0) {
    return Math.floor(number * (10 ** precision)) / (10 ** precision)
  },
  cloneDeep(value) {
    if (typeof (value) == 'number' || typeof (value) == 'string') {
      return value
    }
    if (Array.isArray(value)) {
      return value.map(it => this.cloneDeep(it))
    }
    let res = {}
    if (typeof (value) == 'object') {
      for (let key in value) {
        res[key] = this.cloneDeep(value[key])
      }
    }
    return res
  },
  trim(string = '', chars = ' ') {
    if (typeof chars !== 'string' || chars.length === 0) {
      chars = ' '
    }
    let start = 0
    let end = string.length - 1
    for (let i = 0; i < string.length; i++) {
      let found = false
      for (let j = 0; j < chars.length; j++) {
        if (string[i] == chars[j]) {
          found = true
          break
        }
      }
      if (found == false) {
        start = i
        break
      }
    }
    for (let i = string.length - 1; i >= 0; i--) {
      let found = false
      for (let j = 0; j < chars.length; j++) {
        if (string[i] == chars[j]) {
          found = true
          break
        }
      }
      if (found == false) {
        end = i
        break
      }
    }
    return string.slice(start, end + 1)
  },
  trimStart(string = '', chars = ' ') {
    if (typeof chars !== 'string') {
      chars = ' '
    }
    let start = 0
    for (let i = 0; i < string.length; i++) {
      let found = false
      for (let j = 0; j < chars.length; j++) {
        if (string[i] == chars[j]) {
          found = true
          break
        }
      }
      if (found == false) {
        start = i
        break
      }
    }
    return string.slice(start)
  },
  trimEnd(string = '', chars = ' ') {
    if (typeof chars !== 'string') {
      chars = ' '
    }
    let end = 0
    for (let i = string.length - 1; i >= 0; i--) {
      let found = false
      for (let j = 0; j < chars.length; j++) {
        if (string[i] == chars[j]) {
          found = true
          break
        }
      }
      if (found == false) {
        end = i
        break
      }
    }
    return string.slice(0, end + 1)
  },
  assign(object, ...sources) {
    for (let source of sources) {
      let keys = Object.keys(source)
      for (let key of keys) {
        object[key] = source[key]
      }
    }
    return object
  },
  merge(object, ...sources) {
    for (let source of sources) {
      let keys = Object.keys(source)
      for (let key of keys) {
        if (typeof (source[key]) == 'object') {
          if (!object[key]) {
            object[key] = {}
          }
          this.merge(object[key], source[key])
        } else if (source[key] !== undefined) {
          object[key] = source[key]
        }
      }
    }
    return object
  },
  parseJSON(value) {
    let i = 0
    let skip = () => {
      while (/\s/.test(value[i])) i++
    }
    let parseValue = () => {
      skip()
      let ch = value[i]
      if (ch == '{') {
        return parseObject()
      }
      if (ch == '[') {
        return parseArray()
      }
      if (ch == '"') {
        return parseString()
      }
      if (ch == 't') {
        return parseTrue()
      }
      if (ch == 'f') {
        return parseFalse()
      }
      if (ch == 'n') {
        return parseNull()
      }
      return parseNumber()
    }
    let parseObject = () => {
      let obj = {}
      i++
      skip()
      if (value[i] == '}') {
        i++
        return obj
      }
      while (true) {
        let key = parseString()
        skip()
        i++
        skip()
        let val = parseValue()
        obj[key] = val
        skip()
        if (value[i] == '}') {
          i++
          return obj
        }
        i++
      }
    }
    let parseArray = () => {
      let arr = []
      i++
      skip()
      if (value[i] == ']') {
        i++
        return arr
      }
      while (true) {
        skip()
        let val = parseValue()
        arr.push(val)
        skip()
        if (value[i] == ']') {
          i++
          return arr
        }
        if (value[i] == ',') {
          i++
        }
      }
    }
    let parseString = () => {
      let str = ""
      i++
      while (i < value.length && value[i] !== '"') {
        if (value[i] == '\\') {
          i++
          if (i < value.length) {
            str += value[i]
          }
        } else {
          str += value[i]
        }
        i++
      }
      i++
      return str
    }
    let parseTrue = () => {
      if (value.slice(i, i + 4) == 'true') {
        i += 4
        return true
      }
    }
    let parseFalse = () => {
      if (value.slice(i, i + 5) == 'false') {
        i += 5
        return false
      }
    }
    let parseNull = () => {
      if (value.slice(i, i + 4) == 'null') {
        i += 4
        return null
      }
    }
    let parseNumber = () => {
      let start = i
      if (value[i] == '-') {
        i++
      }
      while (i < value.length && /[\d.]/.test(value[i])) {
        i++
      }
      let numStr = value.slice(start, i)
      return Number(numStr)
    }
    return parseValue()
  },
  isMatch(object, source) {
    if (typeof object !== 'object' || source === null) {
      return object === source
    }
    let keys = Object.keys(source)
    for (let key of keys) {
      if (!this.isMatch(object[key], source[key])) {
        return false
      }
    }
    return true
  },
  toPairs(object) {
    let arr = []
    if (object === null) {
      return arr
    }
    if (object instanceof Map) {
      let entries = object.entries()
      for (let entry of entries) {
        arr.push(entry)
      }
      return arr
    }
    if (object instanceof Set) {
      let entries = object
      for (let entry of entries) {
        arr.push([entry, entry])
      }
      return arr
    }
    let entries = Object.entries(object)
    for (let entry of entries) {
      arr.push(entry)
    }
    return arr
  },
  compact(array) {
    if () {

    }
  },
}