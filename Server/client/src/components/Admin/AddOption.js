import React from 'react'
import axios from '../../config/axios';
import OptionForm from './OptionForm'
class AddOption extends React.Component{
    handleSubmit=(formData)=>{
        axios.post('/option',formData)
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>{
                return{
                    name:'',
                    points :''
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
    return(
        <div>
            <OptionForm handleSubmit={this.handleSubmit} title="Add Option"/>
            </div>

    )
}
}
export default AddOption