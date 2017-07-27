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
        minimum:1800,
        maximum:2017,
        required:true
    },
    movie_rating:{
        type:Number,
        exclusiveMinimum:0,
        exclusiveMaximum:10,
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