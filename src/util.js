var def = require('./define')

function createData(head,content) {
    var data = {
        'head':head,
        'content':content
    }
    return data;
}
exports.createData = createData;

function createMsgContent(account,message) {
    var content = {
        'account':account,
        'message':message
    }
    return content;
}
exports.createMsgContent = createMsgContent;

function createMsgData(account,message) {
    var head = def.MSGDEF.TEXT_MSG;
    var content = createMsgContent(account,message);
    var data = createData(head,content);
    return data;
}
exports.createMsgData = createMsgData;