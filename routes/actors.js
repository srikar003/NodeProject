const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Actors= require('./actorSchema')
mongoose.connect('mongodb://localhost:27017/actors')

let db=mongoose.connection;
db.on('connected',()=>{
    console.log('connected to database of actors at localhost @27017')
})
db.on('error',(err)=>{
    console.log("error occured at database:",err)
})


//display all actors
router.get('/actors',(req,res)=>{
    Actors.find((err,actorList)=>{
        if(err)
            res.send(err)
        else
            res.json(actorList)
    })
})

/*display one actor
router.get('/actor/:id',(req,res)=>{
    db.actors.findOne({_id:mongojs.ObjectId(req.params.id)},(err,actor)=>{
        if(err)
            res.send(err)
        else
            res.json(actor)
    })
})
*/


//save actor
router.post('/actor',(req,res)=>{
    let actor=new Actors({
        actor_name:req.body.actor_name,
        actor_age:req.body.actor_age,
        actor_gender:req.body.actor_gender,
        actor_agency:req.body.actor_agency,
        actor_movies:req.body.actor_movies
    });   
    actor.save((err,actor)=>{
        if(err)
            res.send(err)
        else
            res.json(actor)
    })
})

//delete the actor
router.delete('/actor/:id',(req,res)=>{
    Actors.remove({_id:req.params.id},(err,actorList)=>{
        if(err)
            res.send(err)
        else
            res.json(actorList)
    })
})

router.get('/actors/:name',(req,res)=>{
    Actors.find((err,actorList)=>{
        if(err)
            res.send(err)
        else{
            actorList.forEach(doc=>{
                if(doc.actor_name==req.params.name){
                    res.send(doc._id);
                }
                
            })
        }
            
    })
})

//update the actor
router.put('/actors/:id/:attribute/:content',(req,res)=>{
    let updateActor={}
    switch(req.params.attribute){
    case "actor_name":updateActor={"actor_name":req.params.content};
                        break;
    case "actor_age":updateActor={ "actor_age":req.params.content};
                            break;
    case "actor_gender":updateActor={ "actor_gender":req.params.content};
                            break;
    case "actor_agency":updateActor={ "actor_agency":req.params.content};
                            break;
    case "actor_movies":updateActor={ "actor_movies":req.params.content};
                            break;                                                
    }

    Actors.update({_id:req.params.id},{$set:updateActor},{},(err,actor)=>{
        if(err)
            res.send(err)
        else{
            res.json(actor)

        }
    })
})
module.exports=router;