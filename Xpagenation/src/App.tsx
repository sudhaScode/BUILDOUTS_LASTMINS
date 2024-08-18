
import { useCallback, useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import './App.css'
interface EmployeeData {
  id: string
  name: string
  email: string
  role: string
}

function App() {
  const [empdata, setEmpData]= useState<EmployeeData[]>([]);
  const [activePage, setActivePage] = useState(1)
  const [table, setTableData] = useState<EmployeeData[]>([]); 

  const fetchAPI =async ()=>{
    try{
      const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
     
      if(response.status === 200){
  
      const data = await response.json()
      // console.log(data[0])
      setEmpData(data)
    }
    }
    catch(error){
      window.alert("failed to fetch data")
      console.error(`Data Fetch failed ${error}`)
    }
  }
  const updateTable = useCallback(() => {
    const startIdx = (activePage - 1) * 10;
    const endIdx = startIdx + 10;
    const sub_array = empdata.slice(startIdx, endIdx);
    setTableData(sub_array);
  }, [activePage, empdata]);

  useEffect(()=>{
    fetchAPI()
  },[])
  useEffect(() => {
    if (empdata.length > 0) {
      updateTable();  // Update the table when empdata changes
    }
  }, [empdata, activePage, updateTable]);

  return (
    <>
       <h1>Employee Data Table</h1>
       <EmployeeTable tableData={table}/>
       <div className='actions'>
        <button id= "previous"  onClick={()=>{if (activePage>1) setActivePage(prev=>prev-1)}}>Previous</button>
        <button id ="active">{activePage}</button>
        <button id ="next" onClick={()=>{if (activePage<Math.ceil(empdata.length/10)) setActivePage(prev=>prev+1)}}>Next</button>
       </div>
    </>
  )
}

export default App
