var db = require('../config/connection')

module.exports = {
    addProduct:(product, callback)=>{
        db.get().collection('product').insertOne(product)
        .then((data) => {
            callback(data.insertedId)
        })  
        .catch(err => console.log(err))      
    },
    getAllProducts:()=>{
        return new Promise(async (resolve,reject) => {
            let products = await db.get().collection('product').find().toArray();
            resolve(products)
        })
    }
}