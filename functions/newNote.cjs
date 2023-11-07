var Notedb = require('./models/note.cjs');
const { connect, close } = require('./database/connection.cjs')

exports.handler = async (event, context)=>{
    try{
        await connect()
        const { httpMethod, path, body, queryStringParameters} = event;
        // if (body){
        //     body = JSON.parse(body)
        // }

        if (httpMethod != 'POST'){
            return{
                statusCode: 500,
                body: JSON.stringify({message: "Wrong method"})
            }  
        }

        var note = null
        try{
             note = new Notedb({
                userId:body.userId,
                title:body.title,
                content:body.content,
            })
        }
        catch(err){
            console.log("error: ", err)
        }


        try{
            const data = await note.save(note);
            return{
                statusCode: 200,
                body: JSON.stringify({success:data})
            } 
        }
        catch(err){
            return{
                statusCode: 200,
                body: JSON.stringify({message: body})
            } 
        }

    }
    finally{
        await close()
    }

}