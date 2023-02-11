const express = require("express")
const app = express()
const path = require('path')
const cors = require("cors")
const { default: axios } = require("axios")


const PORT = 4000
let SOIL = 0;
let FILL_TANK = false
let TANK_LEVEL = 100;
let FORCE_WATERING = false;
let CHANCE_RAIN = 0;
let PRECIPITATION = 0;
app.use(cors({"origin":"*"}))
app.use(express.static('public'))

app.listen(PORT, ()=>{
    console.log("App is running on port:" + PORT)
})
app.get("/ff",(req, res)=>{

    res.send("chance of rain"+CHANCE_RAIN)
})

app.get("/send-soil/:level",(req, res)=>{
    SOIL = req.params.level
    res.send("ok")
})
app.get("/send-water/:level",(req, res)=>{
    TANK_LEVEL = req.params.level
    res.send("ok")
})
app.get("/get-soil/:precipt",(req, res)=>{
    PRECIPITATION = req.params.precipt
    res.send({
        soil:SOIL
    })
})
app.get("/should-water",async (req, res)=>{
    //var d = new Date("2011-04-20T09:30:51.01");
    var d = new Date();
    time = d.getHours()

    let water = false

    if(d===5 || d === 18 && (PRECIPITATION < 0.1 && chance_rain < 90))water = true

    if(FORCE_WATERING || water){
        if(FORCE_WATERING)console.log("Forcing Water")

        FORCE_WATERING = false
        res.send("go")
    }else res.send("no")
})
app.get("/should-fill-tank",(req, res)=>{
    if(FILL_TANK)res.send("go")
    else res.send("no")
    FILL_TANK = false
})
app.get("/force-water",(req, res)=>{
    FORCE_WATERING = true
    console.log("FORCE WATERING:"+FORCE_WATERING)
    res.send("FORCE WATERING:"+FORCE_WATERING)
})

app.get("/fill-tank",(req, res)=>{
    FILL_TANK = true
    console.log("fill tank")
    res.send(true)
})
app.get("/get-water/:chance_rain",(req, res)=>{
    CHANCE_RAIN = req.params.chance_rain
    res.send({
        level:TANK_LEVEL
    })
})



module.exports = app