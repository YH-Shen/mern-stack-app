// ODM library for mongo and node. Allow interaction with mongo
const mongoose = require('mongoose');

// bcrypt can be used to encrypt the passwords by hashing them.
// If the database is ever compromised, hacker are not going to 
// have acess to the passwords because of encryption.
const bcrypt = require('bcrypt');

//  Schema => a blue print that every document in this collection has to follow
const UserSchema = new mongoose.Schema({
    username :{
        // mongoose actually provides type checking
        type : String,
        required : true,
        min : 6,
        max : 15
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        // enum creats a validator to check if the value is in the given array
        enum : ['user', 'admin'],
        required: true
    },
    // contains an array of ObjectIds of Todo
    // and use the objectIds as the primary key for todo
    todos : [{type : mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
});

UserSchema.pre('save', function(next){
    // only hash the password if it's plain text
    if(!this.isModified('password')) {
        return next()};
    bcrypt.hash(this.password, 10, (err,passwordHash) => {
        if(err) {
            return next(err)
        };
        this.password = passwordHash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatch)=>{
        if(err){
            return cb(err);
        }
        else{
            if(!isMatch){
                return cb(null,isMatch);
            }
            return cb(null,this);
        }
    });
}

module.exports = mongoose.model('User',UserSchema);