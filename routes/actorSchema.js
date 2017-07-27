const mongoose = require('mongoose')

const actorSchema=mongoose.Schema({
    actor_name:{
        type:String,
        unique:true,
        required:true
    },
    actor_age:{
        type:Number,
        required:true
    },
    actor_gender:{
        type:String,
        required:true
    },
    actor_agency:String,
    actor_movies:{
        type:Array,
        default:[],
        required:true
    }
})
const Actor = module.exports=mongoose.model('Actor',actorSchema);