function ctor(data) {
    if(!data){
        console.log("User Data = null");
        return;
    }    
    var o = {};   
    if(data.account){
        o.account = data.account;
    }else {
        console.log("User Account = null")
        return
    }
    if(data.password){
        o.password = data.password
    }
    return o;
}
exports.ctor = ctor




