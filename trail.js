const mongoose=require("mongoose")
mongoose.connect('mongodb://localhost:27017/movies')
let db=mongoose.connection;
db.on('error',console.error.bind(console,"error occured"))
db.once('open',()=>{
	console.log("good work");
})
const movieSchema=mongoose.Schema({
    movie_name:String
})
let movie=mongoose.model('movie',movieSchema)
let bahubali=new movie({movie_name:"bahubali"})
console.log(bahubali.movie_name)