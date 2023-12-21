const mongo=require('mongoose')
const frndpwdschema=mongo.Schema;

const frndpwd=new frndpwdschema({
    id:{
        type:String,
        required:true
    },
    friendList: [{
        id:{
            type: String
        }
    }]
    
})

const frndpwdUser=mongo.model("frndpwduser",frndpwd)
module.exports=frndpwdUser;