const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 3000 })

wss.on('connection', ws => {
  console.log('大爷,来玩啊')

  ws.on('message', (data) => {
    console.log('2222',data)
    ws.send('憨八猪,你想我不?')
  })

  ws.on('close', () => {
    console.log('大爷, 别走啊')
  })
})