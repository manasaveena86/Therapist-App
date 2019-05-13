import React from 'react'
import ChildForm from './ChildForm'
import axios from '../../config/axios';
class EditChild extends React.Component{
    constructor(){
        super()
        this.state={
            child :{},
            isLoaded :false
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/child/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>({child:response.data,isLoaded:true}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    handleSubmit=(formData)=>{
        const id=this.props.match.params.id
        console.log('in handle submit of edit child',formData)
        axios.put(`/child/${id}`,formData,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }},{
            'content-type' : 'multipart/form-data'
        
        
        })
        .then((response)=>{
            console.log(response.data)
            this.props.history.push('/child/list')
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    render(){
        return(
            <div>
                {this.state.isLoaded&&<ChildForm handleSubmit={this.handleSubmit}
                            name={this.state.child.name}
                            email={this.state.child.email}
                            gender={this.state.child.gender}
                            dob={this.state.child.dob}
                            majorConcerns={this.state.child.majorConcerns}
                            motherName={this.state.child.motherName}
                            phoneNumber={this.state.child.phoneNumber}
                            location={this.state.child.location}
                            //childPhoto={this.state.child.childPhoto}
                            />
                        }
                </div>
        )
    }
        
}
export default EditChild