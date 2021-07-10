var db = require('../config/connection')
var constant = require('../config/constants')

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
    }
}