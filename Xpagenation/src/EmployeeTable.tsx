import { useEffect } from "react"
import styles from "./EmployeeTable.module.css"
interface EmployeeData {
    id: string,
    name: string,
    email: string
    role: string
  }
interface Porps {
    tableData: EmployeeData[]
}

const EmployeeTable:React.FC<Porps>=({tableData})=>{
    useEffect(()=>{
        console.log("Debug:: ",tableData )

    },[tableData])

    return(
       <table className={styles.table}>
         <thead className={styles.thead}>
           <tr>
           <td>ID</td>
           <td>Name</td>
           <td>Email</td>
           <td>Role</td>
           </tr>
         </thead>   
         <tbody>
           
               {tableData && tableData.map((data, index)=><>
                <tr key={index}>
                <td >{data.id}</td>
                <td >{data.name}</td>
                <td >{data.email}</td>
                <td >{data.role}</td>
                </tr>
               </>)}
          
         </tbody>      
       </table>
    )

}
export default EmployeeTable;