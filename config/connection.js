// const mongoClient = require('mongodb').MongoClient
require('dotenv').config()

const state = {
    db:null
}
const dbname = 'shopping'
const { MongoClient } = require('mongodb')

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.mcscx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(url,{useNewUrlParser:true,useUnifiedTopology:true})

module.exports.connect = async function(done){
    try {
        var a = await client.connect();
        state.db = a.db(dbname);
        done()
    } catch (error) {
        return done(error);
    }
    await client.connect();
}

module.exports.get = function(){
    return state.db;
}