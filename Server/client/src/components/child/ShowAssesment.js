import React from 'react'
import {Table,Label} from 'reactstrap'
import axios from '../../config/axios';
//import Radio from '@material-ui/core/Radio';


class ShowAssesment extends React.Component{
    constructor(props){
        super(props)
        this.state={
            assesmentDetails:[],
            options:[],
            rawScore:0,
            resultSubCategory:'',
            optionValue:'',
            data:{},
            array:[],
            childId:'',
            id:props.id?props.id:'',
            categoryArray:[]
            
        }
    }
    componentDidMount(){
          console.log('',this.props)
          let id
          if(this.state.id===''){
              id=this.props.match.params.id
          }
          else{
              id=this.state.id
          }
        //const id=this.state.id
        const p1=axios.get(`/assesmentResult/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        const p2=axios.get('/option/')
        Promise.all([p1,p2])
        .then((response)=>{
            console.log('assesmentdetails',response[0].data)
            const resp=response[0].data.assesment.child
            console.log('child id',resp)

            this.setState(()=>({assesmentDetails:response[0].data.results,options:response[1].data,childId:resp}))
            
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }
    getPoints=(id)=>{
        //console.log('entered  getpoints')
        axios.get(`/option/${id}`)
        .then((response)=>{
            //console.log(response.data)
            //console.log(response.data.points)
            this.setState(()=>({points:response.data.points,isPoint:true}))
           // console.log('points',this.state.points)
        })
    }
    handleOption=(event) =>{
       // const {array} = this.state
       //console.log('target',event.target.attributes)
        const question = event.target.attributes[2].nodeValue
       // console.log('question',question)
        const subcategory = event.target.attributes[3].nodeValue
        this.setState(()=>({resultSubCategory:subcategory}))
        const option=event.target.value
        const id=event.target.id
               
        const data={
            question,
            option:id, 
            subcategory
        }
        console.log('data in handle option after selecting radio button',data)
        axios.put(`/assesmentResult/${this.props.match.params.id}`,data,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            console.log('response from server after adding option ',response.data.result.results)
            this.setState(()=>({categoryArray:response.data.result.results}))
           
        })
        .catch((err)=>{
            console.log(err)
        })
        
    
    }
    
    handleSubmit=(event)=>{
        let data={}
        event.preventDefault()
        //console.log('question option array',this.state.array)
       
        {this.state.categoryArray.forEach(category=>{
            if(category.subcategory==this.state.resultSubCategory){
                category.questions.forEach(question=>{
                    console.log('option',question.option)
                    axios.get(`/option/${question.option}`)
                    .then(response=>{
                        this.setState((prevState)=>({rawScore:prevState.rawScore+parseInt(response.data.points)}))
                        data={
                            subcategory:this.state.resultSubCategory,
                            rawScore:this.state.rawScore
                        }
                        console.log('data in loop',data)
                        this.setState(()=>({data:data}))
                        console.log('data object',this.state.data)
                        axios.put(`/assesmentResult/${this.props.match.params.id}`,data,{
                            headers:{
                                'x-auth':localStorage.getItem('authToken')
                            }
                        })
                        .then((response)=>{
                            console.log('after score added',response.data)
                        
                            this.setState(()=>({rawScore:0,resultSubCategory:''}))
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    })
                   
                })
            }
        })}
       
    }     
        
    handleFinalSubmit=(e)=>{
        e.preventDefault()
        this.props.history.push(`/child/${this.state.childId}/assesment/${this.props.match.params.id}`)
    }
          
         
    
    
    render(){
       // console.log(this.state.assesmentDetails)
       //console.log('Array',this.state.categoryArray)
     console.log('options',this.state.options)
        return(
            <div>
                
                 <h2>Showing </h2>
                
                           {this.state.assesmentDetails.map((data,index)=>{
                               //console.log('data',data)
                               return(
                               <div key={index}>
                               <Table >
                               <thead>
                                <tr><th>category</th></tr>
                                <tr>
                                    <th>Item</th>
                                    <th key={index}>{data.subcategory.name}</th>
                                    <th>Always</th>
                                    <th>Frequently</th>
                                    <th>Occasionally</th>
                                    <th>Seldom</th>
                                    <th>Never</th>
                            </tr>
                               </thead>
                               <tbody>
                                  {data.questions.map((que,index)=>{
                                      return <tr key={index}>
                                      <td>{index}</td>
                                      <td>{que.question.title}</td>
                                            
                                      {this.state.options.map((option,index)=>{
                                          return<td key={index}>
                                          {/* <Radio  
                                          id={option._id}
                                          question={que.question._id} subcategory={data.subcategory._id}  value={option.points}
                                          onChange={this.handleOption}key={index}
                                           />
                                         */}
                                          <Label>
                                              
                                           <input type="radio"  id={option._id} checked={que.option?true:false}
                                           question={que.question._id} subcategory={data.subcategory._id} 
                                           value={option.points} onChange={this.handleOption}key={index}
                                           name={que.question.title}
                                           />
                                           </Label>
                                          </td>
                                      })}
                                      
                                      </tr>
                                      
                                  })} 
                                
                               </tbody>
                               </Table>
                              
                               <><form onSubmit={this.handleSubmit}><input type="submit"value="ADDRESULT"/></form></>
                               </div>
                               )
                           })}
                            <> <form onSubmit={this.handleFinalSubmit}><input type="submit"value="submit"/></form></>
           </div>
        )
    }
}
export default ShowAssesment