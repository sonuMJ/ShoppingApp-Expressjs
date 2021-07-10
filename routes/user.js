var express = require('express');
var router = express.Router();
var productHelper = require('../helper/product-helper');
var userHelper = require('../helper/user-helper');

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.session.user;
  productHelper.getAllProducts().then((products) =>{
    res.render('user/view-products',{admin:false, products, user})
  })
});

router.get("/login",(req,res) => {
  res.render("user/login");
})

router.post("/login",(req,res) => {
  userHelper.doLogin(req.body).then((data) => {
    if(data.status){
      req.session.loggedIn = true;
      req.session.user = data.user;
      res.redirect("/");
    }else{
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
