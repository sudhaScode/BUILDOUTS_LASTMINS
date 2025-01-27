import { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";

const CountryCard = ({ name, flag, abbr }) => {
  return (
    <div className="countryCard">
      <img src={flag} alt={abbr} className="image" />
      <h2 style={{ fontSize: name.length < 15 ? "1rem" : "12px" }}>{name}</h2>
    </div>
  );
};
function App() {
  const [placeholder, setPlaceholder] = useState([]);
  const [countries, setCountries] = useState([]);
  const timerId = useRef("")
  // pageCountries
  /**
   * had a center array -parent
   * had dynamic array as per
   * 
   */
  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    // .then(response=>response.json())
    // .then(data=>setPlaceholder(data))
    // .catch(error=>console.error("Error fetching data:", error))
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");

      if (response.status === 200) {
        const data = await response.json();
        setPlaceholder(data); // for filtering
        setCountries(data); //for maping
        console.log("Fetch successful");
      }
    } catch (error) {
      console.error("API failed");
    }
  };
  const debounce = (event, delay)=>{
    if(timerId.current){
       clearTimeout(timerId.current)
    }
    timerId.current = setTimeout(()=>{filterHandler(event)}, delay)
  }
  const filterHandler = (event) => {
    let value = event.target.value.toLowerCase();
    const filterObj = placeholder.filter((country) =>country.name.common.toLowerCase().includes(value));
    setCountries(filterObj);
  };

  return (
    <div className="App">
      <div className="input-container">
        {" "}
        <input
          className="input"
          type="text"
          placeholder="Sreach country name or code"
          onChange={(event)=>debounce(event, 500)}
        />
      </div>
      <div className="container">
        {countries &&
          countries.map((country, index) => 
            <CountryCard
              name={country.name.common}
              flag={country.flags.svg}
              abbr={country.flag}
              key={index}
            />)}
      </div>
    </div>
  );
}

export default App;
