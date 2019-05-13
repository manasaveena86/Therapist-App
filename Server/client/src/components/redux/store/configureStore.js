import {createStore,combineReducers} from 'redux'
import {userReducer} from '../reducers/user'
//import {categoryReducer} from '../reducers/category'
//import {subCategoryReducer} from '../reducers/subcategory'
const configureStore =()=>{
    //console.log('in configurestore')
    const store = createStore(combineReducers({
        user : userReducer,
        //categories : categoryReducer,
        //subCategories : subCategoryReducer
    }))
    return store
}
export default configureStore