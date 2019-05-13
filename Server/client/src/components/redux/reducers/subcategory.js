import axios from "../config/axios";


function subCategoryIntitalState(){
    let subcategories =[]
    axios.get('/subcategory')
    .then((response)=>{
        subcategories=response.data
        //console.log(subcategories)
    })
    .catch((err)=>{
        console.log(err)
    })
    return subcategories
}
export const subCategoryReducer =(state=subCategoryIntitalState(),action)=>{
    switch(action.type){
        case 'ADD_SUBCATEGORY' :
            return [...state,action.subcategory]
        case 'REMOVE_SUBCATEGORY' :
            return state.filter((subcategory)=>subcategory.id!==action.id)
        case 'UPDATE_SUBCATEGORY' :
            return state.map((subcategory)=>{
                if(subcategory.id===action.id){
                    return {...subcategory,...action.subcategory}
                }
                else{
                    return subcategory
                }
            })
        default :
            return [...state]
    }
}