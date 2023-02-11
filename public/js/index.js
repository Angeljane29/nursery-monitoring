const SERVER_URL = "http://192.168.254.104:4000"


document.body.onload = async function(){
    const futureForcast = "https://api.weatherapi.com/v1/forecast.json?key=25e554c0b773482cb6b173052220306&q=calinog,iloilo&aqi=no&fbclid=IwAR0Gbr-wBhoEhgjmWDpjHpJcZnWaMAXq3ZdUE9iVwUxz8jywomRo_xucH60&days=1"

    

    
    const futureRequest = await fetch(futureForcast)
   const futureData = await futureRequest.json()
   console.log(futureData)



    const temp = futureData.current.temp_c
    const sky = futureData.current.condition.text
    const icon = futureData.current.condition.icon
    

    document.getElementById("temp").innerText = temp + " ℃"
    document.getElementById("sky").innerText = sky
    document.getElementById("sky_icon").src = icon


    const updateValues = async()=>{
        const soilForcast = SERVER_URL+"/get-soil/"+futureData.current.precip_mm
        const tankLevel = SERVER_URL+"/get-water/"+futureData.forecast.forecastday[0].hour[0].chance_of_rain
            const soilRequest = await fetch(soilForcast)
        const tankRequest = await fetch(tankLevel)
    
        const soilData = await soilRequest.json()
        const tankData = await tankRequest.json()
        
        document.getElementById("moist").innerText = soilData.soil + "%"
        document.getElementById("tank-level").innerText = tankData.level + "%"
    }
    setInterval(updateValues,500)



    

    
}
async function forceWater(){
    await fetch(SERVER_URL+"/force-water")
        alert("watering")
}
async function fillTank(){
    await fetch(SERVER_URL+"/fill-tank")
        alert("filling tank")
}