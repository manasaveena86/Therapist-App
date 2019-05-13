import React from 'react'
import axios from '../../config/axios'
import {connect} from 'react-redux'
import Chart from 'react-google-charts';
import {Table} from 'reactstrap'
import moment from 'moment'
import {Link} from 'react-router-dom'
class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            children:[],
            isLoaded:false,
            girls:[],
            boys:[],
            assessments:[],
            isResponse:false
           
        }
    }
    componentDidMount(){
        let p1=axios.get('/child',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        let p2=axios.get('/assesment',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        Promise.all([p1,p2])
        .then(response=>{
            console.log('children',response[0].data)
            console.log('Assesments',response[1].data)
            
            this.setState(()=>({children:response[0].data,assesments:response[1].data.reverse(),isResponse:true}))
          
            const boys=this.state.children.filter(child=>child.gender==='boy')
            const girls=this.state.children.filter(child=>child.gender==='girl')
            console.log('boys',boys)
            console.log('girls',girls)
            this.setState(()=>({boys,girls,isLoaded:true}))
        })
    }
    render(){
       // console.log(this.props.user.user.username)
       const glength=this.state.girls.length
       const blength=this.state.boys.length
       console.log('length',glength,blength)
       let name=this.props.user.user.username
       name=name[0].toUpperCase()+name.slice(1).toLowerCase()
        return(
            <div>
                <h2>Welcome {name}</h2>
                <div className="contanier">
                <div className="row">
                <div className="col-md-4">
                {this.state.isLoaded&&this.state.children.length>0&& <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Gender','Count'],
                    ['Girls', glength],
                    ['Boys', blength]
                   
                ]}
                options={{
                    title: 'Number of Boys And Girls',
                }}
                rootProps={{ 'data-testid': '1' }}
                />}
                </div>
                {this.state.isResponse &&this.state.assesments.length!=0&&<div className="col-md-8">
                
              <h2>Recently Conducted Assessments</h2>
                    <h4>No of assesments {this.state.assesments.length}</h4>
                    <Table>
                        <thead>
                            <tr>
                                <th>Child</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                    <tbody>
                    {this.state.assesments.map(assesment=>{
                            return <tr key={assesment._id}>
                           <Link to={`/child/${assesment.child._id}/assesment`}> <td>{assesment.child.name}</td></Link>
                            <td>{moment(assesment.assesmentDate).format('YYYY /MM /DD')}</td>
                            </tr>
                        })}
                    </tbody>
                    </Table>
                    <ul>
                       
                    </ul>
               
               </div>}
                </div>
                </div>
                
             
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(Dashboard)