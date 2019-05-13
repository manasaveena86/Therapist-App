import React from 'react'
import axios from '../../config/axios';
import QuestionForm from './QForm'

class AddQuestion extends React.Component {
    constructor(){
        super()
        this.state={
            options:[],
            isLoaded:false,
            checkList:[]
        }
    }
    componentDidMount(){
        axios.get('/option')
        .then((response)=>{
            this.setState(()=>({options:response.data}))
            const checkList=this.state.options.map(option=>{
                return{
                    name:'option',
                    id:option._id,
                    value:option.name,
                    checked:false
                }
            })
            this.setState(()=>({checkList:checkList,isLoaded:true}))
        })
    }
    handleSubmit = (data) => {
        axios.post("/question", data )
            .then(response => {
                const data = response.data
                console.log(data)
                this.props.history.push(`/question/show/${data._id}`)

            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log('entered Add Questionn')
        return (
            <div>
                {/* <h2>add</h2> */}
                {this.state.isLoaded&&<QuestionForm handleSubmit={this.handleSubmit} title="Add New Question" 
                checkList={this.state.checkList}/>}
              

            </div>
        )

    }
}
export default AddQuestion