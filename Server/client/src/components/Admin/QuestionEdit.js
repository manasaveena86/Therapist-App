import React from 'react'
import axios from '../../config/axios';
import QuestionForm from './QForm'

class QuestionEdit extends React.Component {
    constructor(){
        super()
        this.state={
            options:[],
            isLoaded:false,
            checkList:[],
            question:{}
        }
    }
    componentDidMount(){
        let p1=axios.get('/option')
        let p2=axios.get(`/question/${this.state.match.params.id}`)
        Promise.all([p1,p2])
        .then((response)=>{
            this.setState(()=>({options:response[0].data,question:response[1].data}))
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
        axios.put(`/question/${this.props.match.params.id}`, data )
            .then(response => {
                const data = response.data
                console.log(data)
               // this.props.history.push(`/question/show/${data._id}`)

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
                {this.state.isLoaded&&
                <QuestionForm handleSubmit={this.handleSubmit}
                 title="Add New Question" checkList={this.state.checkList}
                 qtitle={this.state.question.title}
                  />}
              

            </div>
        )

    }
}
export default QuestionEdit