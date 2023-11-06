var Notedb = require('../models/note.cjs');

exports.handler = async (event, context)=>{

    var { httpMethod, path, body, rawQuery} = event;

    // if(req.query.id){
    //     const id = req.query.id;

    //     Notedb.findById(id)
    //     .then(data=>{
    //         if(!data){
    //             res.status(404).send({message: "Not found note with id "+ id});
    //         }
    //         else{
    //             res.send(data);
    //             console.log("note data: ", data)
    //         }
    //     })
    //     .catch(err=>{
    //         res.status(500).send({message:"Error retrieving note with id "+ id});        
    //     })
    // }
    // else{
    //     Notedb.find()
    //     .then(data=>{
    //         res.send(data);
    //         console.log("all notes: ", data)
    //     })
    //     .catch(err=>{
    //         res.status(500).send({message:err.message});
    //     })
    // }

    return{
        statusCode: 200,
        body: JSON.stringify({httpMethod: httpMethod, path: path, body: body, query: rawQuery})
    }  


}