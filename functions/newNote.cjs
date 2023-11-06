var Notedb = require('./models/note.cjs');
const { connect, close } = require('./database/connection.cjs')

exports.handler = async (event, context)=>{
    try{
        await connect()
        var { httpMethod, path, body, queryStringParameters} = event;

        if (httpMethod != 'POST'){
            return{
                statusCode: 500,
                body: JSON.stringify({message: "Wrong method"})
            }  
        }

        const note = new Notedb({
            userId:body["userId"],
            title:body["title"],
            content:body["content"],
        })
    
        //save note in the database
        note
            .save(note)
            .then(data=>{
                //res.send(data)
                console.log("note saved", data)
                return{
                    statusCode: 200,
                    body: JSON.stringify(data)
                } 
            })
            .catch(err=>{
                return{
                    statusCode: 200,
                    body: JSON.stringify(data)
                } 
            });
    }
    finally{
        await close()
    }

}