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

            var data = ''
            
            try{
                data = await Notedb.findByIdAndDelete(id)
            }
            catch(err){
                return{
                    statusCode: 500,
                    body: JSON.stringify({error:err})
                }  
            }
            
            return {
                statusCode: 200,
                body: JSON.stringify({success:"Note was deleted successfully!"})
            } 

        }
        else{
            return{
                statusCode: 500,
                body: JSON.stringify({error: "Error deleting data"})
            }   
        }
    }
    finally{
        await close()
    }

}