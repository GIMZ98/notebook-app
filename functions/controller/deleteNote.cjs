var Notedb = require('../models/note.cjs');

exports.handler = (req,res)=>{
    const id = req.params.id;

    Notedb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot Delete with id ${id}.`})
            }
            else{
                res.send({message:"Note was deleted successfully!"});
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Could not delete note with id="+id});
        });
}