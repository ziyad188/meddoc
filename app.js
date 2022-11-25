const express = require("express");
const mongoose= require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { exit } = require("process");
const app = express();
//esential
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
//database connection url
mongoose.connect("mongodb+srv://meddoc:root@cluster0.aiglhxw.mongodb.net/?retryWrites=true&w=majority/meddocDB",{useNewUrlParser: true});
//database schema
//schema for patient
const cpatientSchema ={
    nfc: Number,
    patientId: String,
    password: String,
    name: String
}
const Cpatient = mongoose.model("Cpatient",cpatientSchema);

// const demo = new Cpatient({
//     nfc:0,
//     patientId:"12345",
//     password:"admin",
//     name:"ransi"
// })
// demo.save();







//get root
app.get("/",function(req,res){
    res.render("home");
});

app.get("/slc",function(req,res){
    res.render("nfc");
})
app.get("/signup",function(req,res){
    res.render("signup");
})

app.get("/contact",function(req,res){
    res.render("contact");
})
app.get("/login", function(req,res){
    res.render("login")
})
app.get("/nfc", function(req,res){
    var a = 0;
       console.log("redirecting....")
       
    function intervalFunc() {
        Cpatient.findOne({patientId:"12345"}, function(err,found){
            if(found.nfc === 1){
                 a = 1;
            }
        });
      }
      setInterval(intervalFunc, 2000);
      setTimeout(function() { 
        if(a==1){
        res.redirect("/"); 
        }
    }, 5000);
})

app.get("/nfc/auth/:id",function(req,res){
    console.log(req.params['id']);
    var id = req.params['id'];
    Cpatient.findOne({patientId:id}, function(err,foundList){
        console.log(foundList)
        if(foundList == null){
            res.send("invaid nfc");
        }else{
            Cpatient.findOneAndUpdate({id:req.params['id']},{nfc: 1}, function(err,result){
                if(err){
                    res.send("succes");
                }
            })
           
        }
    })

})



















//post root
app.post("/login", function(req,res){
     console.log(req.body);
})








  



//listen
app.listen(process.env.PORT || 3000,function(req,res){
    console.log("server spin up in port 3000");
})




