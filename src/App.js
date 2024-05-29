import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [bgColor, setBgColor] = useState("white");
  const [temp, setTemp] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [humidity, setHumidity] = useState('');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);



  const handleLatChange = (e)=>{
    setLat(parseFloat(e.target.value));
  }

  const handleLongChange = (e)=>{
    setLong(parseFloat(e.target.value));
  }

  useEffect(() => {
    const url =
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=74543c5959be01c335951c997606f917`;

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setCity((prev) => data.name);
        setCountry((prev) => data.sys.country);
        setHumidity(prev => data.main.humidity);
        setTemp(data.main.temp_max.toString().slice(-2));

        if (data.weather[0].main === "Clouds") {
          setBgColor("#577B8D");
        }else if(data.weather[0].main === "Snow"){
          setBgColor("#CDE8E5");
        }else if(data.weather[0].main === "Clear"){
          setBgColor("#FDDE55");
        }else if(data.weather[0].main === "Rain"){
          setBgColor("#1E0342");
        }
        else {
          setBgColor("black");
        }

        setData(data);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };
    fetchWeatherData();
  }, [lat,long]);
  if (!data) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <header>
        <div className="head">Current Weather</div>
      </header>
      <div className="inputs">
        <input type= 'text' className="lat"  onChange = {handleLatChange} placeholder = "Enter Latitude"/>
      
        <input type= 'text' className="long"  onChange={handleLongChange} placeholder = "Enter Longitude"/>

      </div>
        <div className="content">
          <p> Your designation is in country {country}</p>
          <p> City Name is {city}</p>
          <p>Weather is {data.weather[0].main}</p>
          <p>Humidity is {humidity}</p>

          <p>Temperature is {temp} Celcius</p>
        </div>
    </div>
  );
}

export default App;
