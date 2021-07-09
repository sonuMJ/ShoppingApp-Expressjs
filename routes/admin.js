var express = require('express');
var router = express.Router();
var productHelper = require('../helper/product-helper');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products = [
    {
      name:"Iphone 11",
      price:50000,
      img_url:"https://i.gadgets360cdn.com/products/large/apple-iphone-11-406x800-1568197454.jpg",
      category:"Mobile"
    },
    {
      name:"Google Pexel 4A",
      price:31000,
      img_url:"https://images-na.ssl-images-amazon.com/images/I/615nnBCxt7S._AC_SX522_.jpg",
      category:"Mobile"
    },
    {
      name:"Redmi note 10 pro",
      price:21999,
      img_url:"https://www.kibotek.com/wp-content/uploads/2021/03/kiboTEK_redmi_note10_pro_002.png",
      category:"Mobile"
    },
    {
      name:"Oneplus 7 pro",
      price:52999,
      img_url:"https://images-na.ssl-images-amazon.com/images/I/51s0Mb5li8L._SX679_.jpg",
      category:"Mobile"
    },
  ]
  res.render('admin/view-products',{admin:true, products})
});

router.get("/add-product",function(req, res){
  console.log("hiiiiiiii");
  res.render('admin/add-product')
})

router.post("/add-product", function(req,res){
  console.log(req.body);
  console.log(req.files);
  productHelper.addProduct(req.body);
})

module.exports = router;
