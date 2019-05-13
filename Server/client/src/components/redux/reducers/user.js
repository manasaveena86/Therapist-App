import jwtDecode from 'jwt-decode'
import isEmpty from 'lodash/isEmpty'
const token = localStorage.authToken
let userState
if(token){
    const user = jwtDecode(token)
    console.log('user from jwt',user)
    userState = {
        user,
        isAuth : true
    }
   // console.log(userState)
}
    else{
        userState={}
    }


export const userReducer =(state=userState,action={})=>{
    switch(action.type){
        case 'SET_USER' :
            const user=jwtDecode(action.user)
            return {
                user : user,
                isAuth : !isEmpty(user)
            }
        case 'REMOVE_USER':
            return{
                user:action.user,
                isAuth:!isEmpty(action.user)
            }
        default :
            return state
    }

}