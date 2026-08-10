//获取udp模块
let dgram = require('dgram')
//创建
let socket = dgram.createSocket('udp4')

socket.bind(52345)
//发送
socket.send('wwwwwwwww', 10010, '127.0.0.1')

socket.on('message', (data, info) => {

})