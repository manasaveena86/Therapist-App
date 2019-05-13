import React from 'react'
//import {Table} from 'reactstrap'
import axios from '../../config/axios';
//import {Link} from 'react-router-dom'
import {DataTable}  from 'react-data-components'
class DataDisplay extends React.Component{
    constructor(){
        super()
        this.state={
            children:[]
        }
    }
    componentDidMount(){
        console.log('entered cdid mount')
        axios.get('/child')
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>({children:response.data}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
     calAge(dob) { 
         console.log(dob)
        var diff_ms = Date.now() - dob.getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    render(){
            var columns = [
           { title: 'Name',prop: 'name'  },
            { title: 'Gender', prop: 'gender' },
            {title:'MajorConcerns',prop:'majorConcerns'},
            {title:'Email',prop:'email'},
           

          ];
          return(
            <div>
                <DataTable
                className="container"
                keys="id"
                columns={columns}
                initialData={this.state.children}
                initialPageLength={5}
                initialSortBy={{ prop: 'name', order: 'ascending' }}
                pageLengthOptions={[ 5, 20, 50 ]}
            />
            </div>
        )
          } 
    
}
export default DataDisplay