const moongoose = require('mongoose')

const postSchema = moongoose.Schema({
    userid:{
        type:String,
        require:true
    },
    content :{
        type:String,
        require: true
    },
    likes :{
        type:Array,
        default: []
    },
},{timestamps : true}
)
module.exports = moongoose.model('Post', postSchema)