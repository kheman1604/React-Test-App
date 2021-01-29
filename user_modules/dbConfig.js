var mongoose=require("mongoose");
require('dotenv').config();


const dbConfig = process.env.MONGODB_URI;
mongoose.connect(dbConfig, {useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex: true}).then(()=>{
    console.log("Connected");
}).catch((err)=>{
    console.log(err);
})

module.exports=dbConfig;