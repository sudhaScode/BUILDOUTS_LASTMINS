

import { useEffect, useState, useRef , useCallback} from 'react';
import './App.css';

const CountryCard = ({name, flag, abbr})=>{

  return <div className="countryCard">
    <img src={flag} alt={abbr} className='image'/>
    <h2  style={{fontSize:name.length<15?"1rem":"12px"}}>{name}</h2>
  </div>

} 

function App() {
  const [placeholder, setPlaceholder] = useState([]);
  const [countries, setCountries] = useState([])
  const [seachInput, setSearchInput] = useState("")
  const timerId = useRef(null)
  // pageCountries
  /**
   * had a center array -parent
   * had dynamic array as per 
   */
  const getCountries =useCallback(()=>{
    fetch("https://xcountries-backend.azurewebsites.net/all")
    .then(response=>response.json())
    .then(data=>setPlaceholder(data))
    .catch(error=>console.error("Error fetching data:", error))
  },[])
  const debounce = (event, delay)=>{
    if(timerId.current){
       clearTimeout(timerId.current)
    }
    timerId.current = setTimeout(()=>{setSearchInput(event.target.value)}, delay)
  }
  const filterHandler =useCallback((input)=>{
    const filterObj = placeholder.filter(country=>{
      if(country.name.toLowerCase().includes(input)){
        return country
      }
    })
    return filterObj
  },[placeholder])
  
 useEffect(()=>{
     setCountries(filterHandler(seachInput.toLowerCase()))
 }, [seachInput,filterHandler])


 useEffect(()=>{
  setCountries(placeholder)
},[placeholder])

  useEffect(()=>{
    getCountries()
  },[])

  return (
    <div className="App">
        <div className='input-container'> <input className='input' type='text' placeholder='Sreach country name or code' onChange={(event)=>debounce(event, 500)}/></div>
        <div className="container">
        {countries.map((country,index)=><CountryCard name={country.name} flag={country.flag} abbr= {country.abbr} key={`${country.name} ${index}`}/>)}    
        </div>   
    </div>
  );
}

export default App;

