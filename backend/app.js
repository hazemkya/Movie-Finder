const express = require('express');
// const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

require("dotenv").config();
const MDB_UNAME = process.env.MDB_UNAME
const MDB_PASS = process.env.MDB_PASS

// mongoose.connect('', {useNewUrlParser: true,
// useUnifiedTopology: true});


const uri = "mongodb+srv://"+MDB_UNAME+":"+MDB_PASS+"@cluster0.pf7a1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});





app.listen(3000, ()=> console.log("Listening.."));
