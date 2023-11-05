var Notedb = require('../models/note.js');

exports.handler = (req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Data to update can not be empty"});
    }

    const id = req.params.id;
    const title_ = req.body.title;
    const content_ = req.body.content;
    
    Notedb.findByIdAndUpdate(id, {title:title_, content:content_})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Update note with ${id}`});
            }
            else{
                res.status(200).send(data);

            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error Updating note information"});
        })
        
}