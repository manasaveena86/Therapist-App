import React from 'react';
import axios from '../../config/axios'
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
import {connect} from 'react-redux'

const styles = theme => ({
  main: {
    width: '70%',
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

class  Register extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username : '',
      usernameError : '',
      email : '',
      emailError :'',
      password : '',
      passwordError :'',
      noticeMsg :''
  }
  this.emailChange = this.emailChange.bind(this)
  this.passwordChange = this.passwordChange.bind(this)
  this.submitHandle = this.submitHandle.bind(this)
  }
  nameChange=(event)=>{
    const username=event.target.value
    this.setState(()=>({username}))
}
//regular method used fro event handlers
emailChange(event){
    const email=event.target.value
    this.setState(()=>({email}))
}
passwordChange(event){
    const password=event.target.value
    this.setState(()=>({password}))
}
checkforErrors = ()=>{
    let isError = false
    let errors ={}
    console.log('entered checkforerrors')
    if(this.state.username.length<5){
        isError = true
       errors.usernameError ='username must be minimum 5 characers'
    }
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
submitHandle(event){
    event.preventDefault()
    //client side validations
    const formData = {
        username : this.state.username,
        email : this.state.email,
        password : this.state.password
    }
    console.log('formdata',formData)
    const err = this.checkforErrors()
    if(!err){
    axios.post('/user/register',formData)
    .then((response)=>{
        console.log(response.data)
        this.props.history.push('/login')
        this.setState(()=>{
            return {
            username :'',
            usernameError :'',
            email:'',
            emailError:'',
            password : '',
            passwordError:'',
            noticeMsg :response.data.notice
            }

        })
    })
    .catch((err)=>{
        console.log(err)
    })
}



}
render(){
  const { classes } = this.props;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
       
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} >
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">User Name</InputLabel>
            <Input id="username" name="username" autoComplete="username" value={this.state.username}  onChange={this.nameChange} autoFocus />
            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.usernameError}</p>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" value={this.state.email}  onChange={this.emailChange}  />
            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.emailError}</p>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password}  onChange={this.passwordChange.bind(this)} />
            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.passwordError}</p>

          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.submitHandle}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </main>
  );
}
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(Register));