var Userdb = require('./models/user.cjs');
const argon2 = require('argon2');
const { connect, close } = require('./database/connection.cjs')

const hashPassword = async(password) => {
	try{
		const hash = await argon2.hash(password);
		return hash;
	}
	catch(err){
		console.log("err hashing: ", err)
	}
}

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

        if (body){
            body = JSON.parse(body)
        }

        const hpassword = await hashPassword(body.password)

        var user = null
        try{
            user = new Userdb({
                name:body.name,
                password:hpassword,
            })
        }
        catch(err){
            console.log("error: ", err)
        }

        await user.save()
        .then(data => {
            if(!data){
                return{
                    statusCode: 500,
                    body: JSON.stringify({success:"A user with that username already exits"}),
                }
            }
            else{
                return{
                    statusCode: 200,
                    body: JSON.stringify({success:data}),
                }
            }
        })
        .catch(err=>{
            return{
                statusCode: 500,
                body: JSON.stringify({message:err})
            }
        });

        // try{
        //     const data = await user.save();
        //     return{
        //         statusCode: 200,
        //         body: JSON.stringify({success:data})
        //     } 
        // }
        // catch(err){
        //     if(err.code == 11000){
        //         return{
        //             statusCode: 500,
        //             message:"A user with that username already exits",
        //         }
        //     }
        //     else{
        //         return{
        //             statusCode: 500,
        //             message:err,
        //         }
        //     }
        // }
    }
    finally{
        await close()
    }
}