import { useState } from "react"

function App() {
const [count, setCount] = useState(0);

  return (
    <>
    <h1 className="font-bold ml-4 text-3xl text-center">Counter App</h1>
    <p className="font-medium ml-4 text-lg text-center">Count: {count}</p>
     <div className="w-screen flex justify-center content-center ">
     <button onClick={()=>setCount(prev=>prev+1)} name="Increment" className=" items-center w-30 h-8 font-bold text-lg border-2 m-3 rounded-md text-center px-3">Increment</button>
     <button onClick={()=>setCount(prev=>prev-1)} name= "Decrement" className=" items-center w-30 h-8 font-bold text-lg border-2  m-3   rounded-md  text-center px-3">Decrement</button>
     </div>
    </>
  )
}

export default App
