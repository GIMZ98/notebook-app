var Userdb = require('./models/user.cjs');
var Notedb = require('./models/note.cjs');

//Delete a user with given user id in the request
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot Delete with id ${id}.`})
            }
            else{
                res.send({message:"User was deleted successfully!"});
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Could not delete User with id="+id});
        });
}


var Userdb = require('./models/user.cjs');
var Notedb = require('./models/note.cjs');
const { connect, close } = require('./database/connection.cjs')

exports.handler = async (event, context)=>{
    try{
        await connect()
        var { httpMethod, path, body, queryStringParameters} = event;

        if (httpMethod != 'DELETE'){
            return{
                statusCode: 500,
                body: JSON.stringify({message: "Wrong method"})
            }  
        }

    
        if(queryStringParameters["id"]){
            const id = queryStringParameters["id"];
            
            try{
                await Userdb.findByIdAndDelete(id)
                await Notedb.deleteMany({ userId: id })
            }
            catch(err){
                return{
                    statusCode: 500,
                    body: JSON.stringify({error:err})
                }  
            }
            
            return {
                statusCode: 200,
                body: JSON.stringify({success:"User data deleted!"})
            } 

        }
        else{
            return{
                statusCode: 500,
                body: JSON.stringify({error: "Error deleting user data."})
            }   
        }
    }
    finally{
        await close()
    }

}