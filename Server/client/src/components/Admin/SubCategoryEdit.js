import React from 'react'
import axios from '../../config/axios';
import SubCategoryForm from './SubCategoryForm'

class SubCategoryEdit extends React.Component {
    constructor(props){
        super(props)
        this.state={
            subcategory:'',
            isLoaded:false
        }

    }
    componentDidMount(){
        axios.get(`/subcategory/${this.props.match.params.id}`)
        .then(response=>{
            console.log('category infr',response.data.name)
           this.setState(()=>({subcategory:response.data.name,isLoaded:true})) 
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleSubmit = (data) => {
        axios.put(`/subcategory/${this.props.match.params.id}`, data)
            .then(response => {
                const data = response.data
                console.log(data)
               // this.props.history.push("/category/list")

            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
           <div>
            {this.state.isLoaded&& <SubCategoryForm handleSubmit={this.handleSubmit} title=" Edit SubCategory" name={this.state.subcategory}/>}
            </div>
        )

    }
}
export default SubCategoryEdit