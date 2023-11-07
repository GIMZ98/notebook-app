// var Userdb = require('./models/user.cjs');
// const argon2 = require('argon2');




// exports.handler = async (event, context)=>{
//     //validate request
//     if(!req.body){
//         res.status(400).send({message: "Content can not be empty!"});
//         return;
//     }
// 	console.log("login api working")
// 	const username_ = req.body.name
// 	const password_ = req.body.password

// 	var hashPassword = '';
// 	try{	
// 		console.log("try block working", username_)
// 		await Userdb.findOne({ name: username_})
// 		.then((user) => {
// 			console.log("user got: ", user.password)
//             hashPassword = user.password

// 		})
// 		.catch(err => {
// 			console.log("err")
// 		})
		
//         if(await verifyPassword(hashPassword, password_)){
//             res.status(200).send({
//                 message:`user verified`
//             });
//         }
//         else{
//             res.status(500).send({
//                 message:`user unauthorized`
//             });
//         }
// 	}
// 	catch(err){
// 		console.log("Error findOne",err)
// 		res.status(500).send({
// 		message:`Login error`
// 		});
// 	}		
	
// }


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

		await Userdb.findOne({ name: username_})
		.then((user) => {
            hashPassword = user.password
		})
		.catch(err => {
            return{
                statusCode: 500,
                body: JSON.stringify({error:'Not registered!'})
            } 
		})

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