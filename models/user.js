const moongoose = require('mongoose')

const userSchema = moongoose.Schema({
    firstname:{
        type:String,
        require:false
    },
    lastname:{
        type:String,
        require:false
    },
    username:{
        type:String,
        require:true,
        uniqure:true
    },
    email:{
        type:String,
        require:true,
        uniqure:true
    },
    password:{
        type:String,
        require:true
    },
    followers:{
        type:Array,
    },
    following:{
        type:Array
    },
    isadmin:{
        type:Boolean,
        default:false
    }
    
})
module.exports = moongoose.model('User', userSchema)