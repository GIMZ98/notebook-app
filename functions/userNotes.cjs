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
    
            const data = await Notedb.find({ userId:id });
            if(!data){
                return{
                    statusCode: 404,
                    body: JSON.stringify({message: "No notes for user with id: "+ id})
                }  
            }
    
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            } 
        }
        else{
            return{
                statusCode: 500,
                body: JSON.stringify({message: "Need user Id"})
            }  
        }
    }
    finally{
        await close()
    }

}