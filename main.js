//fetching an apiKey to access the real time weather data from Weathermap
const apiKey="7707c6a33018bcc3154e1c4bb22f8f02";

const weatherDataElement=document.getElementById("weather-data");

const cityInputElement=document.getElementById("city-input");


const formElement=document.querySelector("form");

//Adding the event listener 'submit'

formElement.addEventListener("submit",(event) =>{
  event.preventDefault();
  const cityValue=cityInputElement.value;  //obtaining value from the user
  getWeatherData(cityValue);

})
async function getWeatherData(cityValue){
  try{ 
    //waits until the data fetches from an api 
    const response=await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    if(!response.ok){
      throw new Error("Network response was not ok");  
    }
    //converting the obtained weather data into json object
    const data=await response.json();
    //stores the temperature by which it can be further displayed as °C(Celsius)
    const temperature=Math.round(data.main.temp);
    //Tells whether it is Sunny,broken Clouds,etc.,
    const description=data.weather[0].description;
     //renders weather icon according to the real time climatic conditions 
    const icon=data.weather[0].icon;
    
    const details=[
      `Feels like: ${Math.round(data.main.feels_like)}°C`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed}m/s`
    ];
    weatherDataElement.querySelector(".weather-icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather Icon">`

    weatherDataElement.querySelector(".temperature").textContent=`${temperature}°C`;

    weatherDataElement.querySelector(".description").textContent=description;

    weatherDataElement.querySelector(".details").innerHTML=details.map((detail)=> `<div>${detail}</div>`
    ).join("");


  }catch(error){
    weatherDataElement.querySelector(".weather-icon").innerHTML="";

    weatherDataElement.querySelector(".temperature").textContent="";

    weatherDataElement.querySelector(".description").textContent="An error occured please try again later";

    weatherDataElement.querySelector(".details").innerHTML="";

  }
}
