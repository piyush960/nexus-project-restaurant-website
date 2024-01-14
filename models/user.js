const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userName:{
        type: String,
        required: [true, "Please enter a username"],
        unique: true
    },

    email:{
        type:String,
        required: [true, "Please enter a email"],
        unique:true,
        lowercase:true,
        validate: [isEmail, "email is invalid"]
    },

    password:{
        type:String,
        required: [true, "Please enter a password"],
        minlength: [8, "pass must be atleast 8 chars"]
    }

});

// fires a function before user is saved to db (mongoose hooks)
userSchema.pre('save', async function (next){ // function allows the use of current instances (i.e. this)
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.statics.login = async function (userEmailName, password) {

    const user = await this.findOne({
        $or: [{
            userName: userEmailName
        }, 
        {
            email: userEmailName
        }]
    });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Password is Incorrect');
    }
    throw Error('Incorrect username or email');

}

const User = mongoose.model('user', userSchema);
module.exports = User;