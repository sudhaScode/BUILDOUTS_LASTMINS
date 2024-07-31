import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useCallback, useRef } from 'react';


const useTimer = ()=>{
  const [seconds, setSeconds]= useState(0);
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)

  const startTimer =useCallback(()=>{
    // starts the timer
    if(!timerRef.current){
      timerRef.current = setInterval(()=>{setSeconds(prev=>prev+1)}, 1000)
    }
    setIsRunning(true)
  },[])

  const stopTimer =useCallback(()=>{
    // stops the timer
    if(timerRef.current){
      clearInterval(timerRef.current)
      timerRef.current = null;
    }
    setIsRunning(false)
  },[])

  const resetTimer =useCallback(()=>{
    // resets the timer
    if(timerRef.current){
      clearInterval(timerRef.current)
      timerRef.current = null;
    }
    setSeconds(0)
    setIsRunning(false)
  },[])


  useEffect(()=>{
    return ()=>{
      if(timerRef.current){
        clearInterval(timerRef.current)
      }
    }
  },[]);

  return {seconds, isRunning, startTimer, stopTimer, resetTimer};
}

function App() {
  const {seconds, isRunning, startTimer, stopTimer, resetTimer} = useTimer();
  const format_timer =useCallback((seconds)=>{
  const minutes = Math.floor(seconds/60);
  seconds = seconds%60;
 return `${minutes}:${seconds<10? `0${seconds}`:seconds}`
  }, [])
  return (
    <div className="App">
      <h1>Stop Watch</h1>
      <h3>{`Time: ${format_timer(seconds)}`}</h3>
      <div className='con-app'>
      <button onClick={()=>isRunning?stopTimer():startTimer()}>{!isRunning?"Start":"Stop"}</button>
      <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
