const mongo=require('mongoose')
const pwdschema=mongo.Schema;

const pwd=new pwdschema({
    id:{
        type:String,
        required:true
    },
    friendid:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    image:{
        name: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    },
    friendList: [{
        id:{
            type: String
        }
    }]
    
})

const pwdUser=mongo.model("pwduser",pwd)
module.exports=pwdUser;