export const addCategory=(category)=>{
    
    return{
        type :'ADD_CATEGORY',
        category
    }
}
export const removeCategory=(id)=>{
    return {
        type :'REMOVE_CATEGORY',
        id
    }
}
export const deleteCategory =(id)=>{
    return {
        type :'DELETE_CATEGORY',
        id
    }
}
export const updateCategory=(id,category)=>{
    return{
        type :'UPDATE_CATEGORY',
        category,
        id
    }
}
