document.body.onload = async function(){
    const futureForcast = "https://api.weatherapi.com/v1/forecast.json?key=25e554c0b773482cb6b173052220306&q=calinog,iloilo&aqi=no&fbclid=IwAR0Gbr-wBhoEhgjmWDpjHpJcZnWaMAXq3ZdUE9iVwUxz8jywomRo_xucH60&days=1"
    
    const futureRequest = await fetch(futureForcast)
    const futureData = await futureRequest.json()
    console.log(futureData)

    const forecast = futureData.forecast.forecastday[0]

    const table = document.getElementById("weather")
    forecast.hour.forEach(data => {
        let tr = document.createElement("tr")
        let time = document.createElement("td")
        let temp = document.createElement("td")
        let weather = document.createElement("td")
        let feels = document.createElement("td")
        let humidity = document.createElement("td")
        let chance = document.createElement("td")
        let percipt = document.createElement("td")

        time.innerText = data.time
        temp.innerText = data.temp_c + " ℃"
        weather.innerText = data.condition.text
        feels.innerText = data.feelslike_c + " ℃"
        humidity.innerText = data.humidity + "%"
        chance.innerText = data.chance_of_rain + "%"
        percipt.innerText = data.precip_mm + " mm (rain)"

        tr.appendChild(time)
        tr.appendChild(temp)
        tr.appendChild(weather)
        tr.appendChild(feels)
        tr.appendChild(humidity)
        tr.appendChild(chance)
        tr.appendChild(percipt)

        table.appendChild(tr)

    });
    console.log(forecast)

    

    
}