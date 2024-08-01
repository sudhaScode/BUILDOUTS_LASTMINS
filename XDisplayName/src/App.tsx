import {useState, FormEvent} from 'react';
import './App.css'

function App() {
  type obj ={
    firstname: string,
     lastname: string
  }
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [name, setName] = useState<obj>({ firstname: '', lastname: '' });


  const formHandler =(event :FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstname = formData.get('firstname') as string;
    const lastname = formData.get('lastname') as string;
    setName({ firstname, lastname });
    setIsSubmitted(true);
  }
 

  return (
    <>
     <h1>Full Name Display</h1>
     <form onSubmit={(event)=>formHandler(event)}>
     <div>
     <label htmlFor='firstname'>First Name:</label>
     <input name="firstname" id= "firstname" type='text' required/>
     </div>
     <div>
     <label htmlFor='lastname'>Last Name:</label>
     <input name= "lastname" id = "lastname" type='text' required/>
     </div>
      <button type='submit'>Submitt</button>
     </form>
     {isSubmitted && <h1>{`Full Name: ${name.firstname} ${name.lastname}`}</h1>}
    </>
  )
}

export default App
