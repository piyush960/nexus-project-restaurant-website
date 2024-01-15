const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Cart = require('./models/cart.js');
const authRoutes = require('./routes/authRoutes.js');
const {requireAuth, checkUser} = require('./middleware/authUser.js');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI)
.then((result) => {
    console.log('connected to db')
    app.listen(PORT, () => console.log(`server listening to port ${PORT}`));
})
.catch(e => console.log(e));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(cookieParser());

app.get('*', checkUser);
app.use(authRoutes);



app.get('/cart', requireAuth, async (req, res) => {
    const user_id = res.locals.user._id;
    const data = await Cart.find({ user_id });
    res.render('cart', {title:"Cart", data});
})

app.post('/cart', checkUser, async (req, res) => {

    const price = req.body.price;
    const img = req.body.img;
    const dishName = req.body.dishName;
    const user_id = res.locals.user._id;
    
    let quantity = 1;
    try{
        const result = await Cart.findOne({dishName, user_id});
        if(result){
            try{
                await Cart.findOneAndUpdate({dishName, user_id}, {quantity: result.quantity+1});
            }catch(e){
                console.log(e);
            }
        }else{
            const cart = new Cart({
                dishName, 
                img,
                price,
                user_id,
                quantity
            });
            cart.save();
        }
    }catch(e){
        console.log(e);
    }
    res.redirect('/dishes');
})

app.delete('/cart', checkUser, (req, res) => {
    const dishName = req.body.dishName;
    const user_id = res.locals.user._id;

    Cart.findOneAndDelete({dishName, user_id})
    .then(result => { 
        Cart.find()
        .then(data => {
            res.render('cart', {title: "Cart", data});
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
})

// home
app.get('/', (req, res) => {
    res.render('home', {title : "Home"});
})


// dishes
app.get('/dishes', requireAuth, async (req, res) => {
    const search = req.query.dish ? req.query.dish : [];
    const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let data;
    try{
        const response = await fetch(URL+search);
        data = await response.json();
    }catch(e){
        console.log(e);
    }
    res.render('dishes', {title : "Dishes", data, search});

})


// about 
app.get('/about', (req, res) => {
    res.render('about', {title : "About"}); 
})

// reviews
app.get('/reviews', (req, res) => {
    res.render('reviews', {title : "Reviews"});
    
})


app.get('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>');

})


// app.listen(PORT, () => console.log(`server listening to port ${PORT}`));
