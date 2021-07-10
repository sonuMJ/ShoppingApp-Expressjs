var db = require('../config/connection')
var constant = require('../config/constants')
const bcrypt = require('bcrypt')

module.exports = {
    doLogin:(userData)=>{
        return new Promise((resolve, reject) => {
            db.get().collection(constant.TABLE_USER).findOne({email:userData.email}).then((user)=>{
                if(user){
                    bcrypt.compare(userData.password, user.password).then((status) => {
                        if(status){
                            resolve({user:user, status:true})
                        }else{
                            resolve({status:false})
                        }
                    })
                }else{
                    resolve({status:false})
                }
            })
        })
    },
    doSignup:  (userData) =>{
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password,10);
            db.get().collection(constant.TABLE_USER).insertOne(userData).then((data) => {
                resolve(data)
            })
        })
        

    }

}