const mongoose = require('mongoose')

const movieSchema=mongoose.Schema({
    movie_name:{
        type:String,
        unique:true,
        required:true
    },
    movie_description:String,
    movie_year:{
        type:Number,
        required:true
    },
    movie_rating:{
        type:Number,
        required:true
    },
    movie_actors:{
        type:Array,
        default:[],
        required:true
    },
    movie_directors:{
        type:Array,
        default:[],
        required:true
    }
})
const Movie = module.exports=mongoose.model('Movie',movieSchema);