import React from 'react'
import {Link} from 'react-router-dom'
//import TableDisplay from './TableDisplay'
import DataDisplay from '../child/DataTable'
import{Button} from 'reactstrap'
class ChildList extends React.Component{
    
    render(){
        console.log('in child list')
        return(
            <div>
                
                {/* <TableDisplay /> */}
                <DataDisplay/>
               <Button> <Link to="/child/new">AddChild </Link></Button>
                
            </div>
        )
    }
   
}
export default ChildList