# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



import { useEffect, useState } from 'react';
import './App.css';

const CountryCard = ({name, flag, abbr})=>{

  return <div className="card">
    <img src={flag} alt={abbr} className='image'/>
      <h1  style={{fontSize:name.length<15?"1rem":"12px"}}>{name}</h1>
  </div>

} 

function App() {
  const [countries, seCountries] = useState([])
  const [size, setSize] = useState(0);
  const [list, setList] = useState([]);// dummy list for limted pages 
  const [activePage, setActivePage] = useState(1);//to track active page as pe the 
  const [activeIndex, setActiveIndex] = useState(0);// active index as per the list

  /***IMAGES states */
  const [images, setImages] = useState([]);
  const [gallary, setGallary] = useState([]);
  const [firedImages, setFiredImages] = useState(0);
  // pageCountries
  /**
   * had a center array -parent
   * had dynamic array as per 
   */

  useEffect(()=>{
    fetch("https://xcountries-backend.azurewebsites.net/all")
    .then(response=>response.json())
    .then(data=>seCountries(data))
    .catch(error=>console.error("Error fetching data"))
  },[])
  return (
    <div className="App">
     {countries.map((country,index)=><CountryCard name={country.name} flag={country.flag} abbr= {country.abbr} key={`${country.name} ${index}`}/>)}
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

