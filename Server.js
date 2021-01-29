var mongoose=require("mongoose");
var express=require("express");
var path=require("path");
var ReactRouter=require("./Routes/ReactRouter");
var bodyparser=require("body-parser");
var cors=require("cors");


var PORT=process.env.PORT || 8000;
var app=express();
app.use(cors());
app.use(bodyparser.json());
app.use("/api/react",ReactRouter);
app.use(express.urlencoded({extended:true}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"testapp")));


if(process.env.NODE_ENV==='production')
{
    app.use(express.static(path.join(__dirname,"testapp","build")));

    app.get("*",(req,resp)=>{
        resp.sendFile(path.join(__dirname,"testapp","build","index.html"));
    })
}

app.get("/",(req,resp)=>{
    resp.send("HELLO");
});

app.listen(PORT,()=>{
    console.log("Server Started");
});

