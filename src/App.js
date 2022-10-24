import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import { Row, Col } from 'reactstrap';
import { WiWindy, WiHumidity } from "react-icons/wi";
import { CiGlobe } from 'react-icons/ci'

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const city = 'hyderabad';

function App() {
  const [temp, setTemp] = useState(null)
  const [location, setLocation] = useState("")
  const [userLocation, setUserLocation] = useState("delhi")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("")
  const [humidity, setHumidity] = useState(null)
  const [wind, setWind] = useState(null)
  const [country, setCountry] = useState("")
  const [dataFetched, setDataFetched] = useState(false)

  const fetchData = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${apiKey}&units=metric`);
      const data = await res.data

      setTemp(Math.round(data.main.temp))
      setLocation(data.name)
      setDescription(data.weather[0].description)
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCountry(data.sys.country)

      setDataFetched(true)
    } catch (err) {
      console.log(err)
      alert("Please enter a valid location")
    }
  }

  const defaultDataFetched = async () => {
    if (!dataFetched) {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      const data = await res.data

      setTemp(Math.round(data.main.temp))
      setLocation(data.name)
      setDescription(data.weather[0].description)
      setIcon(data.weather[0].icon)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
      setCountry(data.sys.country)
    }

  }

  useEffect(() => {
    defaultDataFetched()
  }, [])

  return (
    <div className="App">
      <div className='weather px-4'>
        <Row xs='1'>
          <Col className='weather_search mt-4'>
            <SearchBar
              text={(e) => setUserLocation(e.target.value)}
              submit={fetchData}
              func={fetchData}
            />
          </Col>
        </Row>

        <Row xs='2' className='weather-panel'>
          <Col className='weather-temp mt-4'>
            <h3> {location}, {country}</h3>
            <p className='temp_val mt-3'>{temp}<sup className='degree'>&#176;C</sup></p>
          </Col>
          <Col className='details'>
            <h6><img src={`http://openweathermap.org/img/wn/${icon}.png`}></img> {description}</h6>
            <p><WiHumidity className='wt-icon' /> {humidity}%</p>
            <p><CiGlobe className='wt-icon' /> {country}</p>
            <p><WiWindy className='wt-icon' /> {wind} Km/h</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
