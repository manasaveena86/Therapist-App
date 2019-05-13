import React from 'react';
import axios from '../../config/axios';
import {setUser} from '../redux/actions/user'
import {connect} from 'react-redux'
//import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class LogIn extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            email:'',
            emailError:'',
            password :'',
            passwordType: "password",
            passwordError:'',
            redirectList : false,
            loginFail:false,
            loginUser:'',
            isLogin : localStorage.getItem('authToken')
            
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleForm=this.handleForm.bind(this)
    }
    
    handleChange(event){
        event.persist()
        this.setState(()=>({
            [event.target.name] : event.target.value
        }))
    }
    checkforErrors = ()=>{
        let isError = false
        let errors ={}
        console.log('entered checkforerrors')
        
        if(!this.state.email.includes('@')){
            isError = true
            errors.emailError = 'enter valid email'
        }
        if(this.state.password.length<8){
            isError = true
            errors.passwordError = 'pasword must be atleast 8 characters'
        }
        if(isError){
            this.setState(()=>({...this.state,...errors}))
            
        }
        return isError
    }
    handleForm(event){
        event.preventDefault()
        const formData={
        email : this.state.email,
        password : this.state.password
    }
    const errors=this.checkforErrors()
    if(!errors){
    axios.post('/user/login',formData)
    .then((response)=>{
        if(response.data.error){

            this.setState(() => ({ loginFail: true }))
        }
        else{
        console.log('response',response.data)
        const tn =response.data.token.token
        //console.log(tn)
        //const user = tn.user
        //console.log('user',user.username)
        //this.setState(()=>({loginUser:user.username}))
        localStorage.setItem('authToken', tn)
        //console.log(response.data)
        this.props.dispatch(setUser(tn))
        this.props.history.push('/user/dashboard')
        this.setState(()=>{
            return{
                email:'',
                emailError:'',
                password : '',
                passwordError:'',
                redirectList:true,
                loginFail:false,
                isLogin : localStorage.getItem('authToken')
                
            }
        })
    }
    })
    .catch((err)=>{
        console.log(err)
    })
    }
}

handleShowPassword = (e) => {
    if (e.target.checked) {
        this.setState({ passwordType: "text", loginFail: false })
    } else {
        this.setState({ passwordType: "password", loginFail: false })

    }
}

    render(){
        if (this.state.redirectList) {
            return 
        }
  const { classes } = this.props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" value={this.state.email} onChange={this.handleChange}autoFocus />
            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.emailError}</p>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type={this.state.passwordType} id="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChange} />
            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.passwordError}</p>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" onClick={this.handleShowPassword}/>}
            label="Show Password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleForm}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
  );
}
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(LogIn));