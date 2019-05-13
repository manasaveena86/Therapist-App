import React from 'react';
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
import axios from '../../config/axios';
import Select1 from 'react-select'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
class AddAssesment extends React.Component{
    constructor(){
        super()
        this.state={
            children :[],
            child:null,
            childError:'',
            assesmentDate:'',
            disciplines:[],
            discipline:'',
            disciplineError:'',
            assesmentCategories:[],
            assesmentCategory:'',
            assesmentDateError:''

        }
    }
    componentDidMount(){
        const p1=axios.get('/child',{
          headers:{
            'x-auth':localStorage.getItem('authToken')
          }
        })
        const p2 = axios.get('/discipline')
        //const p3=axios.get('/assesmentCategory')
        Promise.all([p1,p2])
        .then((response)=>{
            this.setState(()=>{
                return{
                children:response[0].data,
                disciplines:response[1].data,
                //assesmentCategories:response[2].data
                }
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleChild=(child)=>{
        //const child=event.target.value
        //console.log(subchild)
       // console.log(child)
        this.setState(()=>({child:child.value}))
        
    
    } 
    handleDiscipline=(event)=>{
        const discipline=event.target.value
        this.setState(()=>({discipline}))
    }
    // handleassesmentCategory=(event)=>{
    //     const assesmentCategory=event.target.value
    //     this.setState(()=>({assesmentCategory}))
    // }
    handleDate=(e)=> {
        console.log('in handle date ')
        const date=e.target.value
        this.setState(()=>({assesmentDate: date }))
        
    }
    checkForErrors=()=>{
      let isError=false
      let errors={}
      if(this.state.child===null){
        isError=true
        errors.childError='Select child '
      }
      if(this.state.discipline.length===0){
        isError=true
        errors.disciplineError='select discipline'
      }
      if(this.state.assesmentDate===''){
        isError=true
        errors.assesmentDateError='select date'
      }
      if(isError){
        this.setState(()=>({ ...this.state,...errors }))
      }
      return isError
    }
     handleSubmit=(event) =>{
         event.preventDefault()
         const formData={
             child:this.state.child,
             discipline:this.state.discipline,
             assesmentDate:this.state.assesmentDate,
         }
         const error=this.checkForErrors()
         if(!error){
         axios.post('/assesment',formData,{
           headers:{
             'x-auth':localStorage.getItem('authToken')
           }
         })
         .then((response)=>{
             console.log('response',response.data)
             let data=response.data
             console.log(data)
            //  this.setState(()=>{
            //      return{
            //          child:'',
            //          discipline:'',
            //          assesmentDate:new Date(),
            //          assesmentCategory:''
            //      }
            //  })
           this.props.history.push(`/assesment/${data._id}`)
         })
         .catch((err)=>{
             console.log(err)
         })
     }
     }
    render(){
        const { classes } = this.props;
        let options=[]
        options=this.state.children.map((child)=>{
            return {value:child._id,label:child.name}
        })     
        console.log('options',options)  

     return (
        <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Assesment
          </Typography>
          <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Child </InputLabel>
            <Select1  className="basic-single" 
                             classNamePrefix="select"
                            //  value={this.state.child} 
                            // label={this.state.child}
                           
                            onChange={this.handleChild} 
                            options={options}
                            //formatGroupLabel={formatGroupLabel}
                            />
          </FormControl>
          <p style={{ fontSize: '13px' }} className="text-danger">{this.state.childError}</p>
          <FormControl className={classes.container} margin="normal" required  noValidate>
          <TextField
        id="date"
        label="Assesment Date"
        type="date"
        value={this.state.assesmentDate}
        //defaultValue="2017-05-24"
        className={classes.textField}
        onChange={this.handleDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <p style={{ fontSize: '13px' }} className="text-danger">{this.state.assesmentDateError}</p>
       </FormControl>
       <FormControl margin="normal" required fullWidth>
       <InputLabel htmlFor="subcategory">Discipline</InputLabel>
       {/* <select value={this.state.discipline} onChange={this.handleDiscipline}>
                                / <option value="select">select</option> 
                                {this.state.disciplines.map((discipline)=>{
                                    return <option key={discipline._id} value={discipline._id}>{discipline.name}</option>
                                }) }
                                
                            </select> */}
                    <Select
                        value={this.state.discipline}
                        onChange={this.handleDiscipline}
                        inputProps={{
                        name: 'discipline',
                        id: '',
                        }}
                        
                    >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    {this.state.disciplines.map((discipline)=>{
                                    return <MenuItem key={discipline._id} value={discipline._id}>{discipline.name}</MenuItem>
                                }) }
                                
                  </Select>
                  <p style={{ fontSize: '13px' }} className="text-danger">{this.state.disciplineError}</p>
       </FormControl>
       <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
          </form>
      </Paper>
    </main>
     )
    }
     
}

AddAssesment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddAssesment);
