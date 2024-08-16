const express = require('express')
const app=express();
const http= require('http').Server(app)

const mongoClient=require('mongodb').MongoClient

const uri='mongodb://localhost:27017'
const dbName='prayerDB'
//created server listening on port 2000
http.listen(2000,()=>console.log(`listening at port 2000`));

//connect to mongodb


//client instance created 
const client = new mongoClient(uri, { monitorCommands: true });

//using client instance connect to mongodb 
client.on('commandStarted', started => console.log(started));

//create a database
let databaseNew=client.db(dbName);






//created  API  on root URL and send welcome msg in res
app.get('/',async (req,res)=>{
    res.send({sucess:"welcome"})
})

// created /prodct API URL, and took req productName and orderNo and send it in res inside array
app.get('/product',async(req,res)=>{

    const productName= req.params.productName || req.query.productName
    let orderNo=req.params.orderNo || req.query.orderNo

    databaseNew.collection("product").insertOne({"name":productName,"orderNo":orderNo})
    
    let a=[productName,orderNo]
    res.send({sucess:a})
})


app.post('/order',async(req,res)=>{


    let orderNo=req.params.orderNo || req.query.orderNo

    console.log("req of orderNo is", orderNo)
    let orderData=await databaseNew.collection("product").find({orderNo}).toArray()
    
    
    res.send({sucess:orderData})
})