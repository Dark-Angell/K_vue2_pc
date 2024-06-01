const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 3000 })

wss.on('connection', ws => {
  console.log('大爷,来玩啊')

  ws.on('message', (data) => {
    ws.send(data + '憨八猪,你想我不?')
  })

  ws.on('close', () => {
    console.log('大爷, 别走啊')
  })
})