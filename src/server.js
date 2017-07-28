var net = require('net');
var def = require('./define');
var util = require('./util');

var server = net.createServer();
var clientList = [];

function regist(client) {
    if(!client){
        console.log("client not exist")
        return;
    }
    onData(client);
    onEnd(client);
    onError(client);

    var data = util.createMsgData('jasper','hey');
    client.write(JSON.stringify(data));
}

function unregist(client) {
    if(!client){
        console.log("client not exist")
        return
    }

    for(i=0;i<clientList.length;i++){
        if(clientList[i]==client){
            console.log()("client unregist");
            clientList.splice(i,1);
            return;
        }
    }

    console.log("client not found");
}

function onData(client) {
    client.on('data',function(data) {
        console.log("Server Received Msg:" + data.toString());
        analysisData(data);
    });
}

var checkList = {}
checkList[def.MSGDEF.TEXT_MSG] = broadCast;

function analysisData(data) {
    var json = JSON.parse(data);
    checkList[json.head](json.content);
}

function broadCast(content) {
    console.log(content.account + ":" + content.message);
    for(client in clientList){
        var json = util.createMsgData(content.account,content.message);
        client.write(JSON.stringify(json));
    }
}

function onEnd(client) {
    client.on('end',function() {
        console.log("client Connection end");
        unregist(client);
    });
}

function onError(client) {
    client.on('error',function(e) {
        console.log("client error:" + e.toString());
        unregist(client);
   });
}

server.on('connection',regist);

server.on('error',function(e) {
    console.log(e);
});

server.listen(9000,function() {
    console.log("server online");
});

