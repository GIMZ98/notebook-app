var Notedb = require('./models/note.cjs');
const { connect, close } = require('./database/connection.cjs')

exports.handler = async (event, context)=>{
    try{
        await connect()
        var { httpMethod, path, body, queryStringParameters} = event;

        if (httpMethod != 'PUT'){
            return{
                statusCode: 500,
                body: JSON.stringify({message: "Wrong method"})
            }  
        }
    
        if(queryStringParameters["id"]){
            const id = queryStringParameters["id"];

            const title_ = body.title;
            const content_ = body.content;

            var data = ''
            
            try{
                data = await Notedb.findByIdAndUpdate(id, {title:title_, content:content_})
            }
            catch(err){
                return{
                    statusCode: 500,
                    body: JSON.stringify({error:err})
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