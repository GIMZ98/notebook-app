var Notedb = require('./models/note.cjs');

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


var Notedb = require('./models/note.cjs');
const { connect, close } = require('./database/connection.cjs')

exports.handler = async (event, context)=>{
    try{
        await connect()
        var { httpMethod, path, body, queryStringParameters} = event;

        if (httpMethod != 'GET'){
            return{
                statusCode: 500,
                body: JSON.stringify({message: "Wrong method"})
            }  
        }
    
        if(queryStringParameters["id"]){
            const id = queryStringParameters["id"];

            const title_ = body.title;
            const content_ = body.content;

            const data = Notedb.findByIdAndUpdate(id, {title:title_, content:content_})
            if(!data){
                return{
                    statusCode: 404,
                    body: JSON.stringify({message: "Not found note with id "+ id})
                }  
            }

            return {
                statusCode: 200,
                body: JSON.stringify({success:data})
            } 

        }
        else{
            return{
                statusCode: 500,
                body: JSON.stringify({error: "Error retrieving data"})
            }   
        }
    }
    finally{
        await close()
    }

}