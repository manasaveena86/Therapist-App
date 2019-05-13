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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CheckBoxList from './CheckBOXList';
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
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
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
class QuestionForm extends React.Component{
    constructor(props){
        super(props)
        console.log('entered QuestionForm')
        console.log('props',this.props)
        this.state={
            subcategories :[],
            subCategory:'',
            subcategoryError:'',
            title:props.qtitle?props.qtitle:'',
            titleError:'',
            thresholdKey:'',
            thresholdKeyError:'',
            icons:[],
            icon:'',
            checkList:props.checkList,
           
            isAllSelected:false,
            options:[],
            optionError:'',
            isChecked:false,
            isUpdate:false
            
        }
    }
    componentDidMount(){
      console.log('entered com did mount in qform')
        const p1= axios.get('/subcategory')
        //const p2 = axios.get('/icon')
        //const p3=axios.get('/option')
        //const p4=axios.get('/category')
        Promise.all([p1])
        .then((response)=>{
            this.setState(()=>{
                return{
                    subcategories:response[0].data,
                   // serverOptions:response[1].data,
                   // isLoaded:true
                }
            })
            
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleSubCategory=(event)=>{
        const subCategory=event.target.value
        //console.log(subcategory)
        this.setState(()=>({subCategory}))
    }
    handleTitle=(event)=>{
        const title=event.target.value
        //console.log(title)
        this.setState(()=>({title}))
    }
    handleKey=(event)=>{
        const thresholdKey=event.target.value
        this.setState(()=>({thresholdKey}))
    }
    handleOption=(arra)=>{
      console.log('in handle option',arra)
      console.log('is all selected',this.state.isAllSelected)
      
     
       const optionCheckedArray=arra.filter(opt=>opt.checked==true)
       console.log(' array',optionCheckedArray)
        const optionObjectArray=optionCheckedArray.map(option=>{
          return{
            option:option.id
          }
        })
    console.log('object arrray',optionObjectArray)
        this.setState(()=>({options:optionObjectArray}))
      
    }
      
    
      
    handleIcon=(event)=>{
        const id=event.target.id
        const isChecked=event.target.checked
        console.log(id)
        if(isChecked){
        this.setState(()=>({icon:id}))
        }
    }
   
    handleSubmit=(event)=>{
     // console.log(document.getElementById('cbox'))
      
        event.preventDefault()
        console.log('in handle submit',this.state.options)
        const formData={
            title :this.state.title,
            thresholdKey : this.state.thresholdKey,
            subCategory:this.state.subCategory,
            options :this.state.options,
           // icon:this.state.icon
        }
        const error=this.validate()
        if(!error){
        
        console.log('options',this.state.options)
        this.props.handleSubmit(formData)
       // event.target.reset()
        this.setState(()=>{
            return{
                title:'',
                thresholdKey:'',
                subCategory:'',
                options:[],
                //icon:null,
                isChecked:false,
                checkList:[],
                isAllSelected: false
            }
        })
    }
  }
  onCheckBoxChange(checkName, isChecked) {
    console.log('checkname',checkName)
    console.log('entered boxchange')
    let isAllChecked = (checkName === 'all' && isChecked);
    let isAllUnChecked = (checkName === 'all' && !isChecked);
    const checked = isChecked;

    const checkList = this.state.checkList.map((opt, index) => {
        if(isAllChecked || opt.value === checkName) {
            return Object.assign({}, opt, {
                checked,
            });
        } else if (isAllUnChecked) {
            return Object.assign({}, opt, {
                checked: false,
            });
        }

        return opt;
    });

    let isAllSelected = (checkList.findIndex((item) => item.checked === false) === -1) || isAllChecked;

    this.setState({
        checkList,
        isAllSelected,
        isUpdate:true
    });
    console.log('checklist',checkList)
    this.handleOption(checkList)

}

    validate = () => {
        let isError = false;
        const errors = {
            nameError: '',
        }
        if (this.state.title.length === 0) {
          isError = true;
          errors.titleError = "Enter Valid question ";
        }
        if(this.state.subCategory.length===0){
          isError=true
          errors.subcategoryError="Select Subcategory"
        }
        if(this.state.options.length===0){
          isError=true
          errors.optionError='Choose Option'
        }
        if(this.state.thresholdKey.length===0){
          isError=true
          errors.thresholdKeyError='Select ThresholdKey'
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }
    // handleBack=(e)=>{
    //   e.preventDefault()
    //   <Redirect to={"/question/list"}/>
    // }
    render() {
        const { classes } = this.props;
        
        return (
            <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {this.props.title}
                </Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Title</InputLabel>
                    <Input id="title" name="title" autoComplete="title" value={this.state.title} onChange={this.handleTitle} autoFocus />
                    <p style={{ fontSize: '13px' }} className="text-danger">{this.state.titleError}</p>
                  </FormControl>
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="subcategory">SubCategory</InputLabel>
                    <Select
                        value={this.state.subCategory}
                        onChange={this.handleSubCategory}
                        inputProps={{
                        name: 'subCategory',
                        id: '',
                        }}
                        
                    >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    {this.state.subcategories.map((subcategory)=>{
                                                return <MenuItem key={subcategory._id} value={subcategory._id}>{subcategory.name}</MenuItem>
                                            }) }
                        </Select>
                        <p style={{ fontSize: '13px' }} className="text-danger">{this.state.subcategoryError}</p>
                </FormControl>
                
                
                <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Options</FormLabel>
                <CheckBoxList 
                options={this.state.checkList}
                isCheckedAll={this.state.isAllSelected}
                onCheck={this.onCheckBoxChange.bind(this)}
                onChange={this.handleOption}
                 
            />
                {/* {this.state.serverOptions.map((option)=>{
                                    
                                    return (
                                    <div id="cbox">
                                        <FormGroup>
                                        <FormControlLabel
                                           control={
                                        <Checkbox
                                            onChange={this.handleOption}
                                            value={option._id}
                                            id={option._id}
                                            name="cbox"
                                            //defaultChecked={this.state.isChecked}
                                            
                                            />
                                           }
                                           label={option.name}
                                            
                                      />
                                        </FormGroup>
                                    </div>
                                    )
                                        }
                                )} */}
                                <p style={{ fontSize: '13px' }} className="text-danger">{this.state.optionError}</p>
                </FormControl>
               
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="subcategory">ThresholdKey</InputLabel>
                    <Select
                        value={this.state.thresholdKey}
                        onChange={this.handleKey}
                        inputProps={{
                        name: 'thresholdKey',
                        id: '',
                        }}
                        
                    >
                    <MenuItem value=''>{''}</MenuItem>
                    <MenuItem value='L'>L</MenuItem>
                    <MenuItem value='H'>H</MenuItem>
                </Select>
                <p style={{ fontSize: '13px' }} className="text-danger">{this.state.thresholdKeyError}</p>
                 </FormControl>
              
                 <Button
            type="submit"
            
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
            className={classes.submit}
          >
            Submit
          </Button>{'          '}
          <Button
           // type="submit"
            
            variant="contained"
            color="primary"
          // onClick={this.handleBack}
            className={classes.submit}
          >
            Back
          </Button>
        </form>
      </Paper>
      
    </main>
  );
}
}
QuestionForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionForm);