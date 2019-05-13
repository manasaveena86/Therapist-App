import React from 'react'
import axios from '../../config/axios';
import OptionForm from './OptionForm'
class OptionEdit extends React.Component{
    constructor(){
        super()
        this.state={
            option:{},
            isLoaded:false
        }
    }
    componentDidMount(){
        axios.get(`/option/${this.props.match.params.id}`)
        .then(response=>{
            console.log('category infr',response.data.name)
           this.setState(()=>({option:response.data,isLoaded:true})) 
        })
        .catch(err=>{
            console.log(err)
        })
    }
    handleSubmit=(formData)=>{
        axios.put(`/option/${this.props.match.params.id}`,formData)
        .then((response)=>{
            console.log(response.data)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
    return(
        <div>
            {this.state.isLoaded&& <OptionForm handleSubmit={this.handleSubmit} title=" Edit Option"
                    name={this.state.option.name} 
                    points={this.state.option.points}/>}
                    
            </div>

    )
}
}
export default OptionEdit