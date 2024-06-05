import Vue from 'vue'
import { Message } from 'element-ui'
let v = new Vue()
v.$message = Message;
var webSocket = null;
var isConnect = false; //连接状态
var globalCallback = function(e){ console.log(e) };//定义外部接收数据的回调函数，方便再 js 中全局获取
var reConnectNum = 0;//重连次数

// var websocketUrl =  process.env.VUE_APP_API_WEBSOCKET_URL;
var websocketUrl = 'ws://localhost:3000' // 请求地址

//心跳设置
var heartCheck = {
    heartbeatData:{
        DevID:{
            value: '2'
        },
        DevHeart:{
            value:"1"
        }   
    },//心跳包
    timeout: 3 * 1000, //每段时间发送一次心跳包 这里设置为60s(通信间隔时间)
    heartbeat: null, //延时发送消息对象（启动心跳新建这个对象，收到消息后重置对象）
    start: function () {
        console.log(222222, this.heartbeat)
        this.heartbeat = setInterval(()=>{
            if (isConnect){
                console.log(3333333333)
                webSocketSend(this.heartbeatData);
            }else{
                this.clear();
            }
        }, this.timeout);
    },
    reset: function () {
        clearInterval(this.heartbeat);
        this.start();
    },
    clear:function(){
        clearInterval(this.heartbeat);
    }
}

//初始化websocket
function initWebSocket(callback) {
    console.log(1111,'建立连接')
    //此callback为在其他地方调用时定义的接收socket数据的函数
    if(callback){
        if(typeof callback == 'function'){
            globalCallback = callback     
        }else{
            throw new Error("callback is not a function")
        }
    }
    if ("WebSocket" in window) {
        webSocket = new WebSocket(websocketUrl);//创建socket对象
    } else {
        Message({
            message: '该浏览器不支持websocket!',
            type: 'warning'
        });
        return
    }
    //打开
    webSocket.onopen = function() {
        console.log('打开')
        webSocketOpen();
    };
    //收信
    webSocket.onmessage = function(e) {
        console.log('收信')
        webSocketOnMessage(e);
    };
    //关闭
    webSocket.onclose = function(e) {
        console.log('关闭')
        webSocketOnClose(e);
    };
    //连接发生错误的回调方法
    webSocket.onerror = function(e) {
        console.log('报错')
        webSocketonError(e);
    };
}

//连接socket建立时触发
function webSocketOpen() {
    console.log("WebSocket连接成功");
    //首次握手
    webSocketSend(heartCheck.heartbeatData);
    isConnect = true;
    heartCheck.start();
    reConnectNum = 0;
}

//发送数据给服务器
function webSocketSend(data) {
    console.log('发送数据到服务器', data)
    webSocket.send(JSON.stringify(data));//在这里根据自己的需要转换数据格式
}

//客户端接收服务端数据时触发,e为接受的数据对象
function webSocketOnMessage(e) {
    console.log("websocket信息:");
    console.log(e.data)
    const data = (e.data);//根据自己的需要对接收到的数据进行格式化
    globalCallback(data);//将data传给在外定义的接收数据的函数，至关重要。
}

//socket关闭时触发
function webSocketOnClose(e){
    heartCheck.clear();
    isConnect = false; //断开后修改标识
    console.log(e)
    console.log('webSocket已经关闭 (code：' + e.code + ')')
    //被动断开，重新连接
    if(e.code == 1006){
        if(reConnectNum < 3){
            initWebSocket();
            ++reConnectNum;
        }else{
            v.$message({
                message: 'websocket连接不上，请刷新页面或联系开发人员!',
                type: 'warning'
            });
        }
    }
}

//连接发生错误的回调方法
function webSocketonError(e){
    heartCheck.clear();
    isConnect = false; //断开后修改标识
    console.log("WebSocket连接发生错误:");
    console.log(e);
}

//在其他需要socket地方主动关闭socket
function closeWebSocket(e) {
    webSocket.close();
    heartCheck.clear();
    isConnect = false;
    reConnectNum = 0;
}
//在其他需要socket地方接受数据
function getSock(callback) {
    globalCallback = callback
}
//在其他需要socket地方调用的函数，用来发送数据及接受数据
function sendSock(agentData) {
    //下面的判断主要是考虑到socket连接可能中断或者其他的因素，可以重新发送此条消息。
    switch (webSocket.readyState) {
        //CONNECTING：值为0，表示正在连接。
        case webSocket.CONNECTING:
            setTimeout(function() {
                sendSock(agentData, callback);
            }, 1000);
        break;
        //OPEN：值为1，表示连接成功，可以通信了。
        case webSocket.OPEN:
            webSocketSend(agentData);
        break;
        //CLOSING：值为2，表示连接正在关闭。
        case webSocket.CLOSING:
            setTimeout(function() {
                sendSock(agentData, callback);
            }, 1000);
        break;
        //CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
        case webSocket.CLOSED:
        // do something
        break;
        default:
        // this never happens
        break;
    }
}

export default {
  initWebSocket,
  closeWebSocket,
  sendSock,
  getSock
};
