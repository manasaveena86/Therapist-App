import React from 'react'
import axios from '../../config/axios';
import CategoryForm from './CategoryForm'

class AddCategory extends React.Component {

    handleSubmit = (data) => {
        axios.post("/category", data)
            .then(response => {
                const data = response.data
                console.log(data)
                this.props.history.push("/category/list")

            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
                {/* <h2>add</h2> */}
                <CategoryForm handleSubmit={this.handleSubmit} title="Add New Category" />
              

            </div>
        )

    }
}
export default AddCategory