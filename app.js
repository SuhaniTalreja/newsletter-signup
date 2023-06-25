const express = require("express");
const bodyParser = require ("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(request,res){

    const firstName = request.body.firstname;
    const lastName = request.body.lastname;
    const email = request.body.email;
    const data ={
         members: [{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME : firstName,
                LNAME : lastName
            }
         }]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/42776c227b";

    const options = {
        method: "POST",
        auth: "suhani1:c3031a7df3bde997ea19ea5479e11609-us21"
    }

    const request2 = https.request(url,options,function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request2.write(jsonData);
    request2.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000 ,function(){
    console.log("server up on port 3000");
})




//c3031a7df3bde997ea19ea5479e11609-us21
//42776c227b