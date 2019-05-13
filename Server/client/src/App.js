import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
//user
import Login from './components/user/Login'
import Register from './components/user/Register'
import Logout from './components/user/Logout'
//home
import NavBar from './components/Home/NavBar'
import PrivateRoute from './components/Home/Routehiding'
import Footer from './components/Home/Footer'
import Dashboard from './components/Home/Dashboard'
import Home from './components/Home/Home'


//category
import AddCategory from './components/Admin/AddCategory'
import CategoryShow from './components/Admin/CategoryShow'
import CategoryEdit from './components/Admin/CategoryEdit'
//subcategory
import AddSubCategory from './components/Admin/AddSubCategory';
import SubCategoryShow from './components/Admin/SubCategoryShow'
import SubCategoryEdit from './components/Admin/SubCategoryEdit'
//option
import AddOption from './components/Admin/AddOption'
import OptionShow from './components/Admin/OptionShow'
import OptionEdit from './components/Admin/OptionEdit'
//Question
import AddQuestion from './components/Admin/AddQuestion'
import QuestionShow from './components/Admin/QuestionShow'
import QuestionDisplay from './components/Admin/QuestionDisplay'
import QuestionEdit from './components/Admin/QuestionEdit'

import AddIcon from './components/Admin/AddIcon'

//child details
import AddChild from './components/child/AddChild'
import ChildList from './components/child/ChildList'
import ChildShow from './components/child/ChildShow'
import ChildDetails from './components/child/ChildDetails'
import EditChild from './components/child/EditChild'

//Discipline
import ListDiscipline from './components/Admin/ListDiscipline'
import DisciplineForm from './components/Admin/AddDiscipline'

//Assesment
import AddAssesment from './components/child/AddAssesment'
import ShowAssesment from './components/child/ShowAssesment'
import ChildAssesmentResult from './components/child/ShowAssesmentResult'
import EditAssesmentResult from './components/child/EditAssesmentResult'



class App extends Component {
  render() {
    const style = {
      background: '#f2f2f2',
      minHeight: '720px',
      position:'fixed'
    }
    return (
      <BrowserRouter>
     
      <div> <NavBar/></div>
       <div style={{minHeight:'720px'}}>
       
       <Switch>

        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
       
        <Route path="/" component={Home} exact={true}/>
        {/* Admin Routers */}
        <PrivateRoute path="/user/dashboard" component={Dashboard}/>
        <PrivateRoute exact path="/category/new" component={AddCategory}/>
        <PrivateRoute exact path="/question/new" component={AddQuestion} exact={true}/>
        <PrivateRoute exact path="/subcategory/new" component={AddSubCategory}/>
        <PrivateRoute exact path="/discipline/list" component={ListDiscipline}/>
        <PrivateRoute exact path="/discipline/new" component={DisciplineForm}/>
       
        <PrivateRoute exact path="/question/show/:id" component={QuestionDisplay} exact={true}/>
        <PrivateRoute exact path="/question/edit/:id" component={QuestionEdit} exact={true}/>
        <PrivateRoute exact path="/option/new" component={AddOption} exact={true}/>
        <PrivateRoute exact path="/option/list" component={OptionShow} exact={true}/>
        <PrivateRoute exact path="/option/edit/:id" component={OptionEdit} exact={true}/>
        <PrivateRoute exact path="/icon/new" component={AddIcon}/>
        <PrivateRoute exact path="/question/list" component={QuestionShow}/>
        <PrivateRoute exact path="/category/list" component={CategoryShow}/>
        <PrivateRoute exact path="/category/edit/:id" component={CategoryEdit} exact={true}/>
        <PrivateRoute exact path="/subcategory/list" component={SubCategoryShow}/>
        <PrivateRoute exact path="/subcategory/edit/:id" component={SubCategoryEdit} exact={true}/>

        {/* Child Related Routers */}

        <PrivateRoute exact path="/child/new" component={AddChild}exact={true}/>
        <PrivateRoute exact path="/child/list" component={ChildShow} exact={true}/>
        <PrivateRoute exact path="/child/:id/assesment" component={ChildDetails} exact={true}/>
        <PrivateRoute exact path="/child/:id/assesment/:id" component={ChildAssesmentResult} />
        <PrivateRoute exact path="/child/edit/:id" component={EditChild} exact={true}/>
        <PrivateRoute exact path="/child/assesment/new" component={AddAssesment} exact={true}/>
        <PrivateRoute exact path="/assesment/:id" component={ShowAssesment}/>
        <PrivateRoute exact path="/assesmentResult/edit/:id" component={EditAssesmentResult} exact={true}/>
        <PrivateRoute exact path="/logout" component={Logout}/>
        </Switch>
         {/*  */}
      </div>
     <div><Footer/></div>
      </BrowserRouter>
      
    );
  }
}

export default App;
