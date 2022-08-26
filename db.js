const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/notebuk";

let connect = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo");
    })
}

module.exports = connect;