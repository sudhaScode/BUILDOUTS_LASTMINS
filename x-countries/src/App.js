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
  const [countries, seCountries] = useState([])

  useEffect(()=>{
    fetch("https://xcountries-backend.azurewebsites.net/all")
    .then(response=>response.json())
    .then(data=>seCountries(data))
    .catch(error=>console.error("Fetch failed"))
  },[])
  return (
    <div className="App">
     {countries.map(country=><CountryCard name={country.name} flag={country.flag} abbr= {country.abbr}/>)}
    </div>
  );
}

export default App;
