import React from 'react'
//import {Redirect} from 'react-router-dom'
import ChildForm from './ChildForm'
import axios from '../../config/axios';
class AddChild extends React.Component{
    
    handleSubmit=(formData)=>{
        console.log('formData',formData,)
        axios.post('/child',formData,{
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }})
        .then((response)=>{
            console.log('response from server',response.data)
           this.props.history.push('/child/list')
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    render(){
        return(
            <div>
                <ChildForm handleSubmit={this.handleSubmit} title='Add Child Details'/>
                </div>
        )
    }
        
}
export default AddChild