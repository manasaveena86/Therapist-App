export const addSubCategory=(subcategory)=>{
    return{
        type :'ADD_SUBCATEGORY',
        subcategory
    }
}
export const removeSubCategory=(id)=>{
    return {
        type :'REMOVE_SUBCATEGORY',
        id
    }
}
export const deleteSubCategory =(id)=>{
    return {
        type :'DELETE_SUBCATEGORY',
        id
    }
}
export const updateSubCategory=(id,subcategory)=>{
    return{
        type :'UPDATE_SUBCATEGORY',
        subcategory,
        id
    }
}
