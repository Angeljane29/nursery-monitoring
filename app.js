const express = require("express")
const app = express()
const path = require('path')

const PORT = 4000



app.use(express.static('public'))

app.listen(PORT, ()=>{
    console.log("App is running on port:" + PORT)
})

module.exports = app

