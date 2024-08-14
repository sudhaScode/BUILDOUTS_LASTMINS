import React from "react";

// Define the types for the component's props and state
interface CounterProps {
    initialCount: number;
  }
  
  interface CounterState{
    count: number;
  }

class Counter extends React.Component<CounterProps,CounterState>{

    constructor(props:CounterProps){
        super(props);
        this.state ={
          count: props.initialCount
        }
        this.increase = this.increase.bind(this)
        this.decrease = this.decrease.bind(this)
    }
    increase(){
        this.setState(state=>({
            count: state.count+1
        }))
    }
    decrease(){
        this.setState(state=>({
            count: state.count-1
        }))
    }

    render() {
        return(
            <div>
            <h1 className="font-bold ml-4 text-3xl text-center">Counter App</h1>
            <p className="font-medium ml-4 text-lg text-center">Count: {this.state.count}</p>
            <div className="w-screen flex justify-center content-center ">
            <button onClick={this.increase} name="Increment" className=" items-center w-30 h-8 font-bold text-lg border-2 m-3 rounded-md text-center px-3">Increment</button>
            <button onClick={this.decrease} name= "Decrement" className=" items-center w-30 h-8 font-bold text-lg border-2  m-3   rounded-md  text-center px-3">Decrement</button>
            </div>
            </div>
        )
    }

}

export default Counter;