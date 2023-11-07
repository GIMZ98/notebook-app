var Userdb = require('./models/user.cjs');
const argon2 = require('argon2');
const { connect, close } = require('./database/connection.cjs')

exports.handler = async (event, context)=>{
    try{
        await connect()
        var { httpMethod, body } = event;

        if (httpMethod != 'POST'){
            return{
                statusCode: 500,
                body: JSON.stringify({message: "Wrong method!"})
            }  
        }

        if (body){
            body = JSON.parse(body)
        }

        const username_ = body.name
        const password_ = body.password

        var hashPassword = '';


        try{
            const user = await Userdb.findOne({ name: username_});
            hashPassword = user.password
        }
        catch(err){
            return{
                statusCode: 500,
                body: JSON.stringify({error:'Not registered!'})
            } 
        }

        if(await verifyPassword(hashPassword, password_)){
            return{
                statusCode: 500,
                body: JSON.stringify({success:'user verified'})
            } 
        }
        else{
            return{
                statusCode: 500,
                body: JSON.stringify({error:'user unauthorized'})
            } 
        }
    }
    finally{
        await close()
    }
}

const verifyPassword = async(hashedPassword, password) => {
    if (await argon2.verify(hashedPassword, password)){
        return true;
    }
    else{
        return false;
    }
}