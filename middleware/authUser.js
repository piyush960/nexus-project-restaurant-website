const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt; // grab jwt token from browser

    // check if token is present or not

    if(token){
        // verify if token is correct
        jwt.verify(token, 'piyush epicurea web', (err, decodedToken) => {
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                next();
            }
        })

    }else{
        res.redirect('/login');
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){

        jwt.verify(token, 'piyush epicurea web', async (err, decodedToken) => {
            if(err){
                console.log(err);
                res.locals.user = null;
                next();
            }else{
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })

    }else{
        res.locals.user = null;
        next();
    }

}

module.exports = { requireAuth, checkUser };