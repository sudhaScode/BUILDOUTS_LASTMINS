import { useEffect, useState } from 'react';
import './App.css';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';

const CountryCard = ({name, flag, abbr})=>{

  return <div className="card">
    <img src={flag} alt={abbr} className='image'/>
      <h1  style={{fontSize:name.length<15?"1rem":"12px"}}>{name}</h1>
  </div>

} 

function App() {
  const [countries, setCountries] = useState([])

  useEffect(()=>{
    fetch("https://xcountries-backend.azurewebsites.net/all")
    .then(response=>response.json())
    .then(data=>setCountries(data))
    .catch(error=>console.error("Error fetching data:", error))
  },[])
  return (
    <div className="App">
     {countries.map((country,index)=><CountryCard name={country.name} flag={country.flag} abbr= {country.abbr} key={`${country.name} ${index}`}/>)}
    </div>
  );
}

export default App;
