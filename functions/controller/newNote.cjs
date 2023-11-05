var Notedb = require('../models/note.js');

// creates a new note
exports.handler = async (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    //new note
    const note = new Notedb({
        userId:req.body.userId,
        title:req.body.title,
        content:req.body.content,
    })

    //save note in the database
    note
        .save(note)
        .then(data=>{
            //res.send(data)
			console.log("note saved", data)
            res.status(200).send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message:"Error saving note"
            });
        });
}