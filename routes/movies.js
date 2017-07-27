const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Movies= require('./movieSchema')
mongoose.connect('mongodb://localhost:27017/movies')
let db=mongoose.connection;
db.on('connected',()=>{
    console.log('connected to database of movies at localhost @27017')
})
db.on('error',(err)=>{
    console.log("error occured at database:",err)
})

//display all movies
router.get('/movies',(req,res)=>{
    Movies.find((err,movieList)=>{
        if(err)
            res.send(err)
        else
            res.json(movieList)
    })
})

router.get('/movies/:name',(req,res)=>{
    Movies.find((err,movieList)=>{
        if(err)
            res.send(err)
        else{
            movieList.forEach(doc=>{
                if(doc.movie_name==req.params.name){
                    res.send(doc._id);
                }
                
            })
        }
            
    })
})
//save movie
router.post('/movie',(req,res)=>{
    let newMovie=new Movies({
    movie_name:req.body.movie_name,
    movie_description:req.body.movie_description,
    movie_year:req.body.movie_year,
    movie_rating:req.body.movie_rating,
    movie_actors:req.body.movie_actors,
    movie_directors:req.body.movie_directors
    }); 
    
    newMovie.save((err,movieList)=>{
        if(err)
            res.send(err)
        else
            res.json(movieList)
    })
})
//single movie
router.get('/movie/:id',(req,res)=>{
    Movies.findOne({_id:req.params.id},(err,movie)=>{
        if(err)
            res.send(err)
        else
            res.json(movie)
    })
})

//delete the movie
router.delete('/movie/:id',(req,res)=>{
    Movies.remove({_id: req.params.id },(err,movieList)=>{
        if(err)
            res.send(err)
        else
            res.json(movieList)
    })
})

//update the movie
router.put('/movies/:id/:attribute/:content',(req,res)=>{
    let updateMovie={}
    switch(req.params.attribute){
    case "movie_name":updateMovie={"movie_name":req.params.content};
                        break;
    case "movie_description":updateMovie={ "movie_description":req.params.content};
                            break;
    case "movie_rating":updateMovie={ "movie_rating":req.params.content};
                            break;
    case "movie_actors":updateMovie={ "movie_actors":req.params.content};
                            break;
    case "movie_year":updateMovie={ "movie_year":req.params.content};
                            break;
    case "movie_directors":updateMovie={ "movie_directors":req.params.content};
                            break;                                                
    }

    Movies.update({_id:req.params.id},{$set:updateMovie},{},(err,movie)=>{
        if(err)
            res.send(err)
        else{
            res.json(movie)

        }
    })
})

module.exports=router;