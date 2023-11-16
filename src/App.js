import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { API_KEY, API_URL } from './constants';


const queryType = {
  current: 'current.json',
  forecast: 'forecast.json'
}

const cities = {
  Alanya: {
    name:'Alanya'
  },
  NewYork :{
    name: 'New York'
  },
  Moscow :{
    name: 'Moscow'
  }
}

function App() {
  const [query, setQuery] = useState(queryType.current)
  const [city, setCity] = useState(cities.Alanya.name)
  const [data, setData] = useState(null)
  useEffect(()=>{
    fetch(`${API_URL}/${query}?key=${API_KEY}&q=${city}`)
      .then(res => res.json())
      .then(res =>{
        setData(res.current)
      }).catch(err => {
        setData(null)
      })
  },[city, query])
  
  return (
   <div>
    <button onClick={()=>setQuery(queryType.forecast)}>show forecast</button>
    <ul>
      {
        Object.keys(cities).map(key => <li key={key}>
            <button onClick={() =>setCity(cities[key].name)}>{cities[key].name}</button>
          </li>)
      }
    </ul>
    {data && 
      <ul>
        <li className={data.temp_c < 20 ? 'cold': 'hot'}>
          температура С: <span>{data.temp_c}</span>
        </li>
        <li>
          температура F: <span>{data.temp_f}</span>
        </li>
      </ul>
      
    }
   </div>
  );
}

export default App;
