const express = require("express")
const app = express()
const path = require('path')
const cors = require("cors")

const PORT = 4000
let SOIL = 0;

app.use(cors({"origin":"*"}))
app.use(express.static('public'))

app.listen(PORT, ()=>{
    console.log("App is running on port:" + PORT)
})
app.get("/",(req, res)=>{
    res.send("ok")
})

app.get("/send-soil/:level",(req, res)=>{
    SOIL = req.params.level
    res.send("ok")
    console.log("moisture:",SOIL)
})
app.get("/get-soil",(req, res)=>{
    res.send({
        soil:SOIL
    })


})


module.exports = app