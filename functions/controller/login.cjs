var Userdb = require('../models/user.cjs');
const argon2 = require('argon2');

const verifyPassword = async(hashedPassword, password) => {
    if (await argon2.verify(hashedPassword, password)){
        console.log("password matches");
        return true;
    }
    else{
        console.log("wrong password");
        return false;
    }
}


exports.handler = async (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
	console.log("login api working")
	const username_ = req.body.name
	const password_ = req.body.password

	var hashPassword = '';
	try{	
		console.log("try block working", username_)
		await Userdb.findOne({ name: username_})
		.then((user) => {
			console.log("user got: ", user.password)
            hashPassword = user.password

		})
		.catch(err => {
			console.log("err")
		})
		
        if(await verifyPassword(hashPassword, password_)){
            res.status(200).send({
                message:`user verified`
            });
        }
        else{
            res.status(500).send({
                message:`user unauthorized`
            });
        }
	}
	catch(err){
		console.log("Error findOne",err)
		res.status(500).send({
		message:`Login error`
		});
	}		
	
}