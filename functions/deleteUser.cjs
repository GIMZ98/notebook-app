var Userdb = require('./models/user.cjs');

//Delete a user with given user id in the request
exports.delete = (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message: `Cannot Delete with id ${id}.`})
            }
            else{
                res.send({message:"User was deleted successfully!"});
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Could not delete User with id="+id});
        });
}