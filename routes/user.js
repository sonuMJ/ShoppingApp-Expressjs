var express = require('express');
var router = express.Router();
var productHelper = require('../helper/product-helper');
var userHelper = require('../helper/user-helper');

//auth
function checkLogin(req,res,next){
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.session.user;
  productHelper.getAllProducts().then((products) =>{
    res.render('user/view-products',{admin:false, products, user})
  })
});

router.get("/cart", checkLogin,(req, res) => {
  res.render('user/user-cart')
})

router.get("/orders", checkLogin,(req, res)=>{
  res.render('user/user-order')
})

router.get("/login",(req,res) => {
  if(req.session.loggedIn){
    res.redirect("/")
  }else{
    console.log(req.session.loginerr);
    res.render("user/login",{"loginerr" : req.session.loginerr});
    req.session.loginerr = false;
  }
})

router.post("/login",(req,res) => {
  userHelper.doLogin(req.body).then((data) => {
    if(data.status){
      req.session.loggedIn = true;
      req.session.user = data.user;
      res.redirect("/");
    }else{
      req.session.loginerr = true;
      res.redirect("/login");
    }
  })
})

router.get("/register",(req,res) => {
  res.render("user/register");
})

router.post("/signup",(req, res) => {
  userHelper.doSignup(req.body).then((data) => {
    console.log(data);
  })
})

router.get("/logout",(req,res) => {
  req.session.destroy();
  res.redirect("/");
})

module.exports = router;
