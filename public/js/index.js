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

    
}