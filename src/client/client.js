var def = require('./define');
var util = require('./util');
var net = require('net');
var client = null;
process.stdin.resume();
process.stdin.setEncoding('utf8');

var checkList = {}
checkList[def.MSGDEF.TEXT_MSG] = showTextMsg;

var instrucList = {
    closeOrder
}


var userData = {
    account : 'jasper',
}

connectToServer();

function connectToServer() {
    console.log("connecting to server");
    var _client = net.connect({port:9000},function() {
        console.log('connected to server'); 
    });
    _client.on('data',onData);
    _client.on('end',onEnd);
    _client.on('error',onError);

    client =  _client;
    getTextMessageInput(client);
}

function onData(data) {
    console.log("Client Received Data:" + data.toString());
    analysisData(data);
}

function analysisData(data) {
    var json = JSON.parse(data);
    checkList[json.head](json.content);
}

function onEnd(data) {
    console.log("disconnected from server");
}

function onError(e) {
    console.log("Connection error:" + e.toString(0));
    setTimeout(connectToServer,def.CONNECTION.INTERVAL);
}

function showTextMsg(content) {
    if(content.account == userData.account){
        return;
    }
    console.log(content.account + ":" + content.message);
}

function getTextMessageInput(_client) {
    console.log("input:");
    process.stdin.on('data',function(input){
        checkInstrucList(input);
        var data = util.createMsgData(userData.account,input);
        _client.write(JSON.stringify(data));
    });
}

function checkInstrucList(str){
    for(i in instrucList) {
        instrucList[i](str);
    }
}

function closeOrder(str){
    if(str == "close\r\n"){
        client.end();
        return;
    }
}




