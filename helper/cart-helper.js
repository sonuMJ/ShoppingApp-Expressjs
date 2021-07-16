var db = require('../config/connection')
var constant = require('../config/constants')
var objectId = require('mongodb').ObjectID;


module.exports = {
    addToCart:(userId,productId) => {
        return new Promise(async(resolve, reject) => {
            let userCart = await db.get().collection(constant.TABLE_CART).findOne({user: objectId(userId)})
            if(userCart){
                //update item
                db.get().collection(constant.TABLE_CART).updateOne({user:objectId(userId)},
                    {
                        $push:{products:objectId(productId)}
                    }
                ).then((data) => {
                    resolve(data)
                })
                
            }else{
                //add new 
                var cartObj = {
                    user:objectId(userId),
                    products:[objectId(productId)]
                }
                db.get().collection(constant.TABLE_CART).insertOne(cartObj).then((data) => {
                    resolve(data)
                })
            }
        })
    },
    getCartProducts:(userid) => {
        return new Promise(async(resolve, reject) => {
            let cartProducts = await db.get().collection(constant.TABLE_CART).aggregate([
                {
                    $match:{user:objectId(userid)}
                },
                {
                    $lookup:{
                        from: constant.TABLE_PRODUCTS,
                        let:{productList: "$products"},
                        pipeline: [
                            {
                                $match:{
                                    $expr: {
                                        $in : ["$_id", "$$productList"]
                                    }
                                }
                            }
                        ],
                        as : "cartItems"
                    }
                }
            ]).toArray()
            resolve(cartProducts[0].cartItems)
            
        })
    }
}