const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Directors= require('./directorSchema')
mongoose.connect('mongodb://localhost:27017/directors')

let db=mongoose.connection;
db.on('connected',()=>{
    console.log('connected to database of directors at localhost @27017')
})
db.on('error',(err)=>{
    console.log("error occured at database:",err)
})
//display all directors
router.get('/directors',(req,res)=>{
    Directors.find((err,directorList)=>{
        if(err)
            res.send(err)
        else
            res.json(directorList)
    })
})

/*display one director
router.get('/director/:id',(req,res)=>{
    db.directors.findOne({_id:mongojs.ObjectId(req.params.id)},(err,director)=>{
        if(err)
            res.send(err)
        else
            res.json(director)
    })
})
*/

//save director
router.post('/director',(req,res)=>{
    let director=new Directors({ 
        director_name:req.body.director_name,
        director_age:req.body.director_age,
        director_gender:req.body.director_gender,
        director_directors:req.body.director_directors
    }); 

        director.save((err,directorList)=>{
            if(err)
                res.send(err)
            else
                res.json(directorList)
        })
    })

//delete the director
router.delete('/director/:id',(req,res)=>{
    Directors.remove({_id:req.params.id},(err,director)=>{
        if(err)
            res.send(err)
        else
            res.json(director)
    })
})


router.get('/directors/:name',(req,res)=>{
    Directors.find((err,directorList)=>{
        if(err)
            res.send(err)
        else{
            directorList.forEach(doc=>{
                if(doc.director_name==req.params.name){
                    res.send(doc._id);
                }
                
            })
        }
            
    })
})

//update the director
router.put('/directors/:id/:attribute/:content',(req,res)=>{
    let updateDirector={}
    switch(req.params.attribute){
    case "director_name":updateDirector={"director_name":req.params.content};
                        break;
    case "director_gender":updateDirector={ "director_gender":req.params.content};
                            break;
    case "director_age":updateDirector={ "director_age":req.params.content};
                            break;
    case "director_movies":updateDirector={ "director_movies":req.params.content};
                            break;                                               
    }

    Directors.update({_id:req.params.id},{$set:updateDirector},{},(err,director)=>{
        if(err)
            res.send(err)
        else{
            res.json(director)
        }
    })
})
module.exports=router;