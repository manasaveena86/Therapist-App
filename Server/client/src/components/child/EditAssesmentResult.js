import React from 'react'
import axios from '../../config/axios';
import ShowAssesment from './ShowAssesment'
class EditAssesmentResult extends React.Component{
    constructor(){
        super()
        this.state={
            assesmentData:[],
            isLoaded:false
        }
    }
    componentDidMount(){
        axios.get(`/assesmentResult/${this.props.match.params.id}`)
        .then(response=>{
            console.log('in edit ass result',response.data)
            this.setState(()=>({assesmentData:response.data.results,isLoaded:true}))
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        console.log('Asses result id',this.props.match.params.id)
        return(
            <div>
               {this.state.isLoaded&& <ShowAssesment id={this.props.match.params.id}/>}
            </div>
        )
    }
}
export default EditAssesmentResult