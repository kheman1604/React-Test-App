var mongoose=require("mongoose");

var UserSchemaObj=new mongoose.Schema({
    uid :{type:String,index:true,unique:true,required:true},
        pwd : String,
        mob: String,
        dos: {type:Date,default:Date.now },
        picname:String
       
});



var UserModel=mongoose.model("UsersNew2",UserSchemaObj);

module.exports=UserModel;