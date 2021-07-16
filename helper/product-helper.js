var db = require('../config/connection')
var constant = require('../config/constants')
var mongodb = require('mongodb')

module.exports = {
    addProduct:(product, callback)=>{
        db.get().collection(constant.TABLE_PRODUCTS).insertOne(product)
        .then((data) => {
            callback(data.insertedId)
        })  
        .catch(err => console.log(err))      
    },
    getAllProducts:()=>{
        return new Promise(async (resolve,reject) => {
            let products = await db.get().collection(constant.TABLE_PRODUCTS).find().toArray();
            resolve(products)
        })
    },
    deleteProductById:(productId) => {
        return new Promise((resolve, reject) =>{
            db.get().collection(constant.TABLE_PRODUCTS).deleteOne({_id: new mongodb.ObjectID(productId)}).then(data => {
                resolve(data)
            })
            .catch(err => {
                reject()
                console.log(err);
            })
        })
    },
    getProductById:(id) => {
        return new Promise((resolve,reject) => {
            db.get().collection(constant.TABLE_PRODUCTS).findOne({_id: new mongodb.ObjectID(id)}).then((data) => {
                resolve(data)
            })
        })
    },
    updateProduct:(id,product) => {
        return new Promise((resolve,reject) => {
            db.get().collection(constant.TABLE_PRODUCTS).updateOne({_id:new mongodb.ObjectID(id)},{
                $set:{
                    name:product.name,
                    price:product.price,
                    category:product.category
                }
            })
            .then((data) => {
                resolve(data)
            })
        })
    }
}