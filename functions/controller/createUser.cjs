var Userdb = require('../models/user.cjs');
const argon2 = require('argon2');

const hashPassword = async(password) => {
	try{
		const hash = await argon2.hash(password);
		return hash;
	}
	catch(err){
		console.log("err hashing: ", err)
	}
}

exports.handler = async (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

	const hpassword = await hashPassword(req.body.password)
    //new user
    const user = new Userdb({
        name:req.body.name,
        password:hpassword,
    })

    //save user in the database
    user
        .save(user)
        .then(data=>{
            res.status(200).send(data)
			console.log("user saved", data)
        })
        .catch(err=>{
            if(err.code == 11000){
                res.status(500).send({
                    message:"A user with that username already exits"
                });
            }
            else{
                res.status(500).send({
                    message:err.message
                });
            }
        });
}