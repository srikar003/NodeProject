const mongoose = require('mongoose')

const directorSchema=mongoose.Schema({
    director_name:{
        type:String,
        unique:true,
        required:true
    },
    director_age:{
        type:Number,
        required:true
    },
    director_gender:{
        type:String,
        required:true
    },
    director_movies:{
        type:Array,
        default:[],
        required:true
    }
})
const Director = module.exports=mongoose.model('Director',directorSchema);