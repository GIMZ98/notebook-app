var Notedb = require('../models/note.cjs');

exports.handler = async (event, context)=>{

    var { httpMethod, path, body, queryStringParameters} = event;


    if(queryStringParameters["id"]){
        const id = queryStringParameters["id"];

        // await Notedb.findById(id)
        // .then(data=>{
        //     if(!data){
        //         return{
        //             statusCode: 404,
        //             body: JSON.stringify({message: "Not found note with id "+ id})
        //         }  
        //     }
        //     else{
        //         console.log("note data: ", data)
        //         return{
        //             statusCode: 200,
        //             body: JSON.stringify(data)
        //         }  
        //     }
        // })
        // .catch(err=>{
        //     return{
        //         statusCode: 500,
        //         body: JSON.stringify({message: "Error retrieving data"})
        //     }        
        // })
        return{
            statusCode: 200,
            body: JSON.stringify({id: id})
        }  
    }
    else{
        await Notedb.find()
        .then(data=>{
            return{
                statusCode: 200,
                body: JSON.stringify(data)
            }  
        })
        .catch(err=>{
            return{
                statusCode: 500,
                body: JSON.stringify({message: "Error retrieving data"})
            }   
        })
    }

    // return{
    //     statusCode: 200,
    //     body: JSON.stringify({message: "Not found note with id "+ id})
    // }  


}