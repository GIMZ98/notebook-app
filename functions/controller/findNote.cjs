var Notedb = require('../models/note.cjs');

exports.handler = async (event, context)=>{

    var { httpMethod, path, body, queryStringParameters} = event;


    if(queryStringParameters["id"]){
        const id = queryStringParameters["id"];

        const data = await Notedb.findById(id);
        if(!data){
            return{
                statusCode: 404,
                body: JSON.stringify({message: "Not found note with id "+ id})
            }  
        }

        return data; 
        // return{
        //     statusCode: 200,
        //     body: JSON.stringify({id: id})
        // }  
    }
    else{
        var data = ''
        
        try{
          data = Notedb.find()
        }
        catch(err){
          console.log("Err: ", err)
        }

        if(!data==''){
            return{
                statusCode: 500,
                body: JSON.stringify({message: "Error retrieving data"})
            }   
        }

        return data; 
        
    }

    // return{
    //     statusCode: 200,
    //     body: JSON.stringify({message: "Not found note with id "+ id})
    // }  


}