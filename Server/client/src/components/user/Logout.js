import React from 'react'
import axios from '../../config/axios';
import {removeUser} from '../redux/actions/user'
import {connect} from 'react-redux'
class  Logout extends React.Component{
    constructor(props){
        super(props)
        this.state={
            logoutMessage : false
        }
    }
    componentDidMount(){
        axios.delete('/user/logoutfromall',{ headers: { 'x-auth': localStorage.getItem('authToken') } })
        .then((response)=>{
            console.log(response.data)
            
            this.setState(()=>({logoutMessage:true}))
            this.props.dispatch(removeUser({}))
            localStorage.removeItem('authToken')

            this.props.history.push('/login')
        })
        .catch((err)=>{
            console.log(err)
            
        })
    }
    render(){
        console.log('in logout')
        return(
            <div>
           
        
        </div>
        )
    }
    
}
export default connect()(Logout)