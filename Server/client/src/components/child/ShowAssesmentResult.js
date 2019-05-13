import React from 'react'
import axios from '../../config/axios';
import {Table} from 'reactstrap'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'
class ChildAssesmentResult extends React.Component{
    constructor(){
        super()
        this.state={
            finalResult:[],
            childId:''
        }
    }
    componentDidMount(){
        console.log(this.props.match.params.id)
        const id=this.props.match.params.id
        axios.get(`/assesmentResult/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log(response.data.assesment._id)
            console.log('in show assesment result',response.data)
            this.setState(()=>({finalResult:response.data.results,childId:response.data.assesment.child}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <h3>In Child Assesment Result</h3>
               <Link to={`/assesmentResult/edit/${this.props.match.params.id}`} ><Button color="primary" >Edit</Button></Link>
               <Link to={`/child/${this.state.childId}/assesment`}><Button color="danger">Back</Button></Link>
                {this.state.finalResult.map((result,index)=>{
                    return(
                        <div>
                            <Table>
                    <thead>
                        <tr key={index}><th>{result.subcategory.name}</th></tr>
                        <tr>
                            <th>Title</th>
                            <th>Selected option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.questions.map((que,index)=>{
                            return <tr key={index}>
                            <td>{que.question.title}</td>
                            <td>{que.option.name}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
                <h5>RawScore Total...{result.rawScore}</h5>
                            </div>

                    )
                })}
               </div>
        )
    }
}
export default ChildAssesmentResult