import React from 'react'

import axios from '../../config/axios';
import SubCategoryForm from './SubCategoryForm'


class AddSubCategory extends React.Component {

    handleSubmit = (data) => {
        axios.post("/subcategory", data)
            .then(response => {
                const data = response.data
                console.log(data)
                //this.props.history.push("/subcategory/list")

            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div>
               
                <SubCategoryForm handleSubmit={this.handleSubmit} title="Add New SubCategory" />
              

            </div>
        )

    }
}
export default AddSubCategory