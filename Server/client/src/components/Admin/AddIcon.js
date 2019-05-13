import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import Select from 'react-select'
// import InputAdornment from '@material-ui/core/InputAdornment';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
//import axios from '../axios/config';
import axios from '../../config/axios';
import FormLabel from '@material-ui/core/FormLabel';
//import {Form,FormGroup,Label,Input} from 'reactstrap'

import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },

    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: "10%",

    },
    
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit * 3,
        alignContent: 'center'
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
    formlabel: {
        fontSize: '12px',
        marginTop: '5px'
    },
    textfield: {
        height: 5,
    },
    labelRoot: {
        fontSize: 15,
        marginBottom: 40
    },
    label: {
        padding: 0
    },
    container: {

        marginBottom: "10px"
    },
    input: {
        display: 'none',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },

    fileLabel: {
        fontSize: '14px',
        marginTop: '10px'
    }
});
class AddIcon extends React.Component{
    constructor(){
        super()
        this.state={
            title:'',
            titleError:'',
            icon:null
        }
    }
    handleTitle=(event)=>{
        const title=event.target.value
        this.setState(()=>({title}))
    }
    handleIcon=(event)=>{
        const icon=event.target.files[0]
        icon.src=''
        this.setState(()=>({icon}))
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const formData=new FormData()
        formData.append('title',this.state.title)
        formData.append('icon',this.state.icon)
        axios.post('/icon',formData)
        .then((response)=>{
            console.log(response.data)
            this.setState(()=>({title:'',icon:null}))
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        const { classes } = this.props;
        // console.log(this.props)
         return (
             <React.Fragment>
 
 
                 <main className={classes.layout}>
                     <Paper className={classes.paper}>
                         <Typography gutterBottom component="h5" variant="h5" align="center">
                             Add Icon
                         </Typography>
                         <React.Fragment>
                             <hr />
                             <React.Fragment>
                                 <form className={classes.form}>
                                     <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                         <Grid item xs={2} className={classes.label} >
                                             <Typography variant="button" gutterBottom>Title</Typography>
                                         </Grid>
                                         <Grid item xs={7}>
                                             <TextField
                                                 id="title"
                                                 name="title"
                                                 value={this.state.title}
                                                 onChange={this.handleTitle}
                                                 fullWidth
                                                 autoComplete="pname"
                                             />
                                             <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                                         </Grid>
                                     </Grid>
                                     
                                         
                                             <FormLabel className={classes.formlabel} error={true}>{this.state.nameError}</FormLabel>
                                             <Grid container spacing={24} className={classes.container} alignItems="center" justify="center">
                                            <Grid item xs={2} className={classes.label} >
                                                <Typography variant="button" gutterBottom>Image</Typography>
                                            </Grid>

                                            <Grid item xs={7}>
                                                <input
                                                    name="image" onChange={this.handleIcon}
                                                    className={classes.input}
                                                    id="contained-button-file"
                                                    multiple
                                                    type="file"
                                                />
                                                <label htmlFor="contained-button-file">
                                                    <Button variant="contained" component="span" className={classes.button}>
                                                        Upload
                                                     <CloudUploadIcon className={classes.rightIcon} />
                                                    </Button>
                                                    {/* <FormLabel className={classes.fileLabel} focused={true} required={true}>Can Upload Maximum 3 Images</FormLabel> */}
                                                </label><br />
                                                <FormLabel className={classes.formlabel} error={true}>{this.state.fileError}</FormLabel>
                                            </Grid>

                                        </Grid>

                                    
                                    <Grid container spacing={0} alignItems="center" justify="center">

                                        <div className={classes.buttons}>
                                            <Link to='/'>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                   // onClick={this.handleBack}
                                                    className={classes.button}
                                                    fullWidth>
                                                    Back
                                            </Button>
                                            </Link>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleSubmit}
                                                className={classes.button}
                                                fullWidth
                                            > Submit
                                            </Button>
                                        </div>
                                    </Grid>
                                </form>
                            </React.Fragment>

                        </React.Fragment>

                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}


AddIcon.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddIcon);
