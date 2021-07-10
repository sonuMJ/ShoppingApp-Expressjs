var express = require('express');
var router = express.Router();
var productHelper = require('../helper/product-helper');

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products) =>{
    res.render('admin/view-products',{admin:true, products})
  })
});

router.get("/add-product",function(req, res){
  res.render('admin/add-product')
})

router.post("/add-product", function(req,res){
  console.log(req.body);
  console.log(req.files.imageupload);
  productHelper.addProduct(req.body,(id) => {
    let image = req.files.imageupload;
    image.mv("./public/product-images/"+id+ ".jpg", (err,done)=>{
      if(!err){
          res.render('admin/add-product')
      }
      else{
        console.log(err);
      }
    })
    
  });
})

module.exports = router;
