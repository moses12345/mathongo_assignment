const express = require("express")
const app = express()
const routes = require('./routes')
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const port = process.env.PORT

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());    
mongoose.connect(
  process.env.DB
).then(data=>{
    console.log("Db is running..................... ")
}).catch((err)=>{
    console.log("this is an error")
});

app.get("/",(req,res)=>{
    return res.send("<h1>Just To Check</h1>")
})
app.use('/api',routes)

app.listen(port|| 8000,()=>{console.log("Serve is running on port number 8000")})