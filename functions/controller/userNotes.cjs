var Notedb = require('../models/note.js');

exports.handler = (req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Data to update can not be empty"});
    }

    const id = req.params.id;
    
    Notedb.find({ userId:id })
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Can't find notes for user with id ${id}`});
            }
            else{
                res.status(200).send(data);

            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error getting notes"});
        })
        
}