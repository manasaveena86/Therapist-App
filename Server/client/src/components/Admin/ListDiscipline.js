import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
class  ListDisciplines extends React.Component {
    constructor(){
        super()
        this.state={
            disciplines:[]
        }
    }
    componentDidMount(){
        axios.get('/discipline')
        .then((response)=>{
            this.setState(()=>({disciplines:response.data}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
       
    render(){
    return(
        <div>
             <div className="container">
                <div className="row">
                <div className="col">
                <h2>Listing disciplines-{this.state.disciplines.length}</h2>
            <ul>
                {this.state.disciplines.map((discipline)=>{
                    return <li key={discipline._id}>{discipline.name}</li>
                })}
            </ul>
                </div>
            <Link to="/discipline/new"> AddDiscipline</Link>
            </div>
            </div>
        </div>
    )
    }
}
export default ListDisciplines
