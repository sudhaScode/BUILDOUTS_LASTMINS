

import { useEffect, useState } from 'react';
import './App.css';

const CountryCard = ({name, flag, abbr})=>{

  return <div className="card">
    <img src={flag} alt={abbr} className='image'/>
      <h1  style={{fontSize:name.length<15?"1rem":"12px"}}>{name}</h1>
  </div>

} 

function App() {
  const [placeholder, setPlaceholder] = useState([]);
  const [countries, setCountries] = useState([])
  const [size, setSize] = useState(0);
  const [list, setList] = useState([]);// dummy list for limted pages 
  const [activePage, setActivePage] = useState(1);//to track active page as pe the 
  const [activeIndex, setActiveIndex] = useState(0);// active index as per the list


  const [gallary, setGallary] = useState([]);
  const [firedImages, setFiredImages] = useState(0);
  // pageCountries
  /**
   * had a center array -parent
   * had dynamic array as per 
   */
  const stackEvents =()=>{
    fetch("https://xcountries-backend.azurewebsites.net/all")
    .then(response=>response.json())
    .then(data=>setCountries(data))
    .catch(error=>console.error("Error fetching data:", error))
    
}
const nextHandler =()=>{
  setSize((prevState)=>prevState-1);
  if(size <=placeholder.length){
      setActivePage((prevSate)=>prevSate+1);
  }
  if(activeIndex<list.length-1){
      setActiveIndex((prevSate)=>prevSate+1)
  }
  if(activeIndex===list.length-1 && activePage< placeholder.length){
      
      const firstElement = placeholder.findIndex((number) => number === list[0].page)+1;
      const lastElement = placeholder.findIndex((number) => number === list[list.length - 1].page)+1;
      let currentPages =[];
     
     for (let i=firstElement;i<=lastElement;i++){
        currentPages.push({
          page: placeholder[i],
        })
     }
     
      setList(currentPages);
  }
}
const prevHandler =()=>{
  setSize((prevState)=>prevState+1);
 
  if(size >=0){
      setActivePage((prevSate)=>prevSate-1);
     
  }
  if(activeIndex>=1){
      setActiveIndex((prevSate)=>prevSate-1)
  }
  if(activeIndex ===0){
      const firstElement = placeholder.findIndex((number) => number === list[0].page)-1;
      const lastElement = placeholder.findIndex((number) => number === list[list.length - 1].page)-1;
      let currentPages =[];
    
      for (let i=firstElement;i<=lastElement;i++){
         currentPages.push({
           page: placeholder[i],
         })
      }
    
       setList(currentPages);
  }
}
const clickHandler =(page, index)=>{
  setActiveIndex(index);
  setActivePage(page);
}

//SIDE EFFECTS/////
useEffect(()=>{
  stackEvents()
  const numbers = new Array(14).fill(0).map((_, i) => i + 1);
  setPlaceholder(numbers);
},[]);

useEffect(()=>{ //setting up dummy list 
  let currentPagesList =[];
  //console.log(countries.length, "length") 
  //console.log(placeholder.length);
 for (let i=0;i<placeholder.length;i++){
    currentPagesList.push({
      page: placeholder[i],
    })
 }
  setList(currentPagesList);
  setSize(placeholder.length-1);

},[placeholder]);

useEffect(()=>{//setting page wise images 
 // console.log(countries.length, "fsdad")
  let currentImages =[];
  let firingIndex =firedImages;  
  for(let i=0;i<placeholder.length;i++){
      currentImages.push(countries[firingIndex]);
      firingIndex++;
 }
  setGallary(currentImages);
  setFiredImages(activePage*placeholder.length);
},[activePage,countries]);

useEffect(()=>{
 
  setSize(placeholder.length-activePage)
 
},[activeIndex]);

  return (
    <div className="App">
     {gallary.map((country,index)=><CountryCard name={country.name} flag={country.flag} abbr= {country.abbr} key={`${country.name} ${index}`}/>)}
     <div className="pagenantion">
        <div className="container">
            <button className="navbutton" disabled={size===placeholder.length-1} onClick={prevHandler}>prev</button>
            {list.map((stack,index)=>(
                <button key={`${index} ${stack}`} className={activePage===stack.page?"page-button":""} onClick={()=>clickHandler(stack.page, index)}>{stack.page}</button>
            ))}
            <button className="spread-button">.....</button>
            <button>{size}</button> 
            <button className="navbutton" disabled={size<1} onClick={nextHandler}>next</button>
        </div>
    </div>
   
    </div>
  );
}

export default App;

