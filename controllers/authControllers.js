const User = require("../models/user");
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    const error = { 'userName': '','email': '', 'password': '' };

    if(err.code === 11000){
        if(String(err).includes('userName')){
            error['userName'] = "username already exists";
        }
        if(String(err).includes('email')){
            error['email'] = "email already exists";
        }
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        })
    }

    return error;
}

const maxAge = 3 * 24 * 60 * 60;
function createToken(id){
    return jwt.sign({ id }, 'piyush epicurea web', { expiresIn: maxAge });
}

const login_get = (req, res) => {
    res.render('auth');
}

const login_post = async (req, res) => {
    
    const { userEmailName, password } = req.body;
    try{
        const user = await User.login(userEmailName, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }catch(e){
        const error = { 'userEmailName': '', 'password': '' };
        if(e.message.includes('Incorrect username or email')){
            error['userEmailName'] = e.message;
        }
        if(e.message.includes('Password is Incorrect')){
            error['password'] = e.message;
        }
        res.status(400).json({ error });
    }

}

const logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}

// const signup_get = (req, res) => {
//     res.render('auth');
// }

const signup_post = async (req, res) => {
    const {userName, email, password} = req.body;
    try{
        const user = await User.create({userName, email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({user: user._id});
    }catch(e){
        const error = handleErrors(e);
        res.status(400).json({error});
    }
}

module.exports = {login_get, login_post, signup_post, logout_get};