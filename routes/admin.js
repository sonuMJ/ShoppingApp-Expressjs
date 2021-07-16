var express = require('express');
var router = express.Router();
var productHelper = require('../helper/product-helper');

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products) =>{
    res.render('admin/view-products',{admin:true, products})
  })
});

router.get('/admin-orders',(req, res) => {
  res.render('admin/admin-orders',{admin:true})
})

router.get("/add-product",function(req, res){
  res.render('admin/add-product',{admin:true})
})

router.get("/edit/:id", async (req, res)=>{
  let id = req.params.id;
  let product = await productHelper.getProductById(id);
  console.log(product);
  res.render('admin/edit-product', product)
})

router.get("/delete/:id", async (req, res) =>{
  let id = req.params.id;
  let deleteProduct = await productHelper.deleteProductById(id)
  if(deleteProduct){
    res.redirect('/admin/')
  }
  
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

router.post("/edit-product/:id",(req, res) => {
  let id = req.params.id;
  productHelper.updateProduct(id, req.body).then((data) => {
    console.log(data);
    if(req.files.imageupload){
      let image = req.files.imageupload;
      image.mv("./public/product-images/"+id+ ".jpg", (err,done)=>{
        if(!err){
            res.render('admin/add-product')
        }
        else{
          console.log(err);
        }
      })
    }
    res.redirect('/admin/')
  })
})

module.exports = router;
