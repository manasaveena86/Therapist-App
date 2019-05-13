import React from 'react';
//import axios from '../../config/axios'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

//import {connect} from 'react-redux'
import { FormGroup } from '@material-ui/core';

const styles = theme => ({
  main: {
    width: '800%',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350,
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

class ChildForm extends React.Component{
    constructor(props){
        super(props)
        console.log('props from edit',props)
        this.state={
            name :props.name? props.name:'',
            nameError :'',
            gender :props.gender? props.gender:'',
            genderError:'',
            dob :props.dob?props.dob:'',
            dobError:'',
            majorConcerns:props.majorConcerns? props.majorConcerns:'',
            majorConcernsError :'',
            motherName :props.motherName? props.motherName:'',
            motherNameError :'',
            phoneNumber:props.phoneNumber? props.phoneNumber:'',
            phoneNumberError :'',
            location :props.location? props.location:'',
            locationError:'',
            email:props.email? props.email:'',
            emailError :'',
            childPhoto:props.childPhoto? props.childPhoto:null

        }
        this.handleChange=this.handleChange.bind(this)
    }

    checkForErrors = ()=>{
        let isError = false
        let errors ={}
        console.log('entered checkforerrors')
        if(this.state.name.length<5){
            isError = true
           errors.nameError ='name must be minimum 5 characers'
        }
        if(!this.state.email.includes('@')){
            isError = true
            errors.emailError = 'enter valid email'
        }
        if(this.state.motherName.length<3){
            isError = true
            errors.motherNameError = 'mother name must be atleast 3 characters'
        }
        if(this.state.majorConcerns.length===0){
          isError=true
          errors.majorConcernsError='enter major concerns'
        }
        if(this.state.phoneNumber.length<10){
            isError = true
            errors.phoneNumberError = 'phone number should be 10 numbers'
        }
        if(this.state.location.length===0){
            isError = true
            errors.locationError = 'location should not be empty'
        }
        if(this.state.gender.length===0){
          isError=true
          errors.genderError='choose gender'
        }
        if(this.state.dob.length===0){
          isError=true
          errors.dobError='select date of birth'
        }
        if(isError){
            this.setState(()=>({...this.state,...errors}))
            
        }
        return isError
    }
    handleSubmit=(event)=>{
        event.preventDefault()
       
        // const formData = new FormData()
        // console.log('in handle submit this.state',this.state)
        // formData.append('name' , this.state.name)
        // console.log(this.state.name)
        // console.log('formdata name',formData.name)
        // formData.append('gender' ,this.state.gender)
        // formData.append('dob' ,this.state.dob)
        // formData.append('majorConcerns',this.state.majorConcerns)
        // formData.append('motherName',this.state.motherName)
        // formData.append('phoneNumber',this.state.phoneNumber)
        // formData.append('location',this.state.location)
        // formData.append('email',this.state.email)
        // formData.append('childPhoto',this.state.childPhoto)
        const formData={
          name:this.state.name,
          motherName:this.state.motherName,
          location:this.state.location,
          gender:this.state.gender,
          dob:this.state.dob,
          phoneNumber:this.state.phoneNumber,
          email:this.state.email,
          majorConcerns:this.state.majorConcerns
        }
        //console.log(formData)
        const errors =this.checkForErrors()
       if(!errors){
        this.props.handleSubmit(formData)
        this.setState(()=>{
            return{
                name : '',
                nameError :'',
                gender :'',
                dob :'',
                majorConcerns:'',
                majorConcernsError :'',
                motherName :'',
                motherNameError :'',
                phoneNumber:'',
                phoneNumberError :'',
                location :'',
                locationError:'',
                email:'',
                emailError :'',
                childPhoto:null
            }
        
        
        })
    }
    }
    
      handleDate=(event)=>{
          const dob=event.target.value
          console.log(dob)
          this.setState(()=>({dob}))
      }
    handleChange(event){
        event.persist()
        //console.log('in handle change',event.target.value)
        this.setState(()=>({
            [event.target.name]:event.target.value
        }))
    }
    handleGender =(event)=>{
        console.log('in handle gender',event.target.value)
        const gender=event.target.value
        this.setState(()=>({gender}))
    }
    handlePhoto=(event)=>{
        const childPhoto=event.target.files[0]
        console.log(childPhoto)
        childPhoto.src=''
        this.setState(()=>({childPhoto}))
    }

render(){
  const { classes } = this.props;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
        <Typography component="h1" variant="h5">
          Add Child
        </Typography>
        <form className={classes.form} >
        <FormGroup>
        <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Child Name</InputLabel>
            <Input id="name" name="name" autoComplete="name" value={this.state.name}  onChange={this.handleChange} autoFocus />
            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.nameError}</p>
            </FormControl>
          <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Mother Name</InputLabel>
            <Input id="motherName" name="motherName" autoComplete="motherName" value={this.state.motherName}  onChange={this.handleChange}  />
            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.motherNameError}</p>
          </FormControl>
          </FormGroup>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" value={this.state.email}  onChange={this.handleChange}  />
            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.emailError}</p>
          </FormControl>
          
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Phone Number</InputLabel>
            <Input id="phoneNumber" name="phoneNumber" autoComplete="phoneNumber" value={this.state.phoneNumber}  onChange={this.handleChange}  />
            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.phoneNumberError}</p>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">MajorConcerns</InputLabel>
            <Input id="majorConcerns" name="majorConcerns" autoComplete="majorConcerns" value={this.state.majorConcerns}  onChange={this.handleChange}  />
            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.majorConcernsError}</p>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Location</InputLabel>
            <Input id="location" name="location" autoComplete="location" value={this.state.location}  onChange={this.handleChange}  />
            <p style={{ fontSize: '13px' }} className="text-danger">{this.state.locationError}</p>
          </FormControl>
          <FormControl className={classes.container} margin="normal" required fullWidth>
          <TextField
              id="date"
              label="Birthday"
              type="date"
            // defaultValue="2017-05-24"
              className={classes.textField}
              value={this.state.dob}
              onChange={this.handleDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
             <p style={{ fontSize: '13px' }} className="text-danger">{this.state.dobError}</p>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.state.gender}
            onChange={this.handleGender}
          >
            <FormControlLabel value="girl" control={<Radio />} label="Girl" />
            <FormControlLabel value="boy" control={<Radio />} label="Boy" />
           </RadioGroup>
        </FormControl>
        <p style={{ fontSize: '13px' }} className="text-danger">{this.state.genderError}</p>
        <FormControl margin="normal" required fullWidth>
            <FormLabel htmlFor="username">Photo</FormLabel>
            <input type="file" name="childPhoto" encType="multipart/form-data" 
                        accept="image/*" onChange={this.handlePhoto}/>
                        </FormControl>
      <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                            className={classes.button}
                            fullWidth
                        > Submit
                        </Button>
          </form>
      </Paper>
    </main>
  );
}
}
ChildForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChildForm);
 