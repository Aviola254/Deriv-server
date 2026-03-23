const express = require("express");

const app = express();

app.use(express.json());

let users = [
 { username:"admin", password:"1234" }
];

let sessions = {};

app.post("/login",(req,res)=>{

let {username,password} = req.body;

let user = users.find(
u=>u.username===username && u.password===password
);

if(!user){
return res.json({success:false});
}

let token =
Math.random().toString(36).substring(2);

sessions[token]=username;

res.json({
success:true,
token:token
});

});

app.get("/",(req,res)=>{
res.send("Server running");
});

app.listen(3000,()=>{
console.log("Server started");
});
