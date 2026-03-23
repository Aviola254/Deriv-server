const express = require("express")
const path = require("path")

const app = express()

app.use(express.static("public"))

app.get("/api", (req,res)=>{
  res.send("API OK")
})

app.listen(3000, ()=>{
  console.log("server running")
})
