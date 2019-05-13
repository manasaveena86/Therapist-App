import axios from "../config/axios";

function categoryInitialState(){
   // console.log('entered intital state')
    let categories=[]
     axios.get('/category')
    .then((response)=>{
        categories=response.data
       // console.log('data from sever category intitial state',categories)
        
       
    })
    .catch((err)=>{
        console.log(err)
    })
    return categories
   
}
export const categoryReducer = (state=categoryInitialState(),action)=>{
    //console.log('in category reducer state value',state)
    switch(action.type){
        case 'ADD_CATEGORY' :
            return [...state,action.category]
        case 'REMOVE_CATEGORY' :
            return state.filter((category)=>category.id!==action.id)
        case 'UPDATE_CATEGORY' :
            return state.map((category)=>{
                if(category.id===action.id){
                    return {...category,...action.category}
                }
                else{
                    return category
                }
            })
        default :
            return [...state]
    }
}