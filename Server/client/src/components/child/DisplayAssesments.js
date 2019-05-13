import React from 'react'
import {Table} from 'reactstrap'
const Display=(props)=>{
    console.log('props',props)
    return(
        <div>
            <ul>
           {props.assesmentDetails.map((assesment,index)=>{
               console.log(index,assesment.results)
               return <li key={index}>
               <ul>
              { assesment.results.map((data,index)=>{
                  return <li key={index}>{data.subcategory.name}
                  
                  </li>
               } )}
               </ul>
               </li>
           })}
             </ul> 
        </div>
    )
}
export default Display