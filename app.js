const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('', {useNewUrlParser: true,
useUnifiedTopology: true});






app.listen(3000, ()=> console.log("Listening.."));
