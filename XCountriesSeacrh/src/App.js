

import { useEffect, useState, useRef , useCallback} from 'react';
import './App.css';

const CountryCard = ({name, flag, abbr})=>{

  return <div className="card">
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
  const getCountries =async()=>{
   
    // .then(response=>response.json())
    // .then(data=>setPlaceholder(data))
    // .catch(error=>console.error("Error fetching data:", error))
    try{
      const response = await  fetch("https://xcountries-backend.azurewebsites.net/all");

    if(response.status ===200){
      const data = await response.json()
      setPlaceholder(data)// fro filtering
      setCountries(data) //for maping
      console.log("Fetch successful")
    }
    else{
      throw Error
    }
    }
    catch(error){
      console.error("API failed")
    }
  }
  // const debounce = (event, delay)=>{
  //   if(timerId.current){
  //      clearTimeout(timerId.current)
  //   }
  //   timerId.current = setTimeout(()=>{setSearchInput(event.target.value)}, delay)
  // }
  const filterHandler =(event)=>{
    let value = event.target.value.toLowerCase()
    const filterObj = placeholder.filter(country=>{
      if(country.name.toLowerCase().includes(value)){
        return country
      }
      return "";
    })
    setCountries(filterObj)
  }

  useEffect(()=>{
    getCountries()
  },[])

  return (
    <div className="App">
        <div className='input-container'> <input className='input' type='text' placeholder='Sreach country name or code' onChange={filterHandler}/></div>
        <div className="countryCard">
        {countries.map((country,index)=><CountryCard name={country.name} flag={country.flag} abbr= {country.abbr} key={`${country.name} ${index}`}/>)}    
        </div>   
    </div>
  );
}

export default App;

