import React from 'react'
import axios from '../../config/axios';
import CategoryForm from './CategoryForm'

class CategoryEdit extends React.Component {
    constructor(props){
        super(props)
        this.state={
            category:'',
            isLoaded:false
        }

    }
    componentDidMount(){
        axios.get(`/category/${this.props.match.params.id}`)
        .then(response=>{
            console.log('category infr',response.data.name)
           this.setState(()=>({category:response.data.name,isLoaded:true})) 
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleSubmit = (data) => {
        axios.put(`/category/${this.props.match.params.id}`, data)
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
            {this.state.isLoaded&&  <CategoryForm handleSubmit={this.handleSubmit} title=" Edit Category" name={this.state.category}/>}
            </div>
        )

    }
}
export default CategoryEdit