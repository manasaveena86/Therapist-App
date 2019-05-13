import React from 'react';
import axios from '../../config/axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'
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
class QuestionDisplay extends React.Component {
    constructor(){
        super()
        this.state={
            question:{},
            isLoaded:false
        }
    }
    
        componentDidMount(){
                    const id=this.props.match.params.id
                    axios.get(`/question/${id}`)
                    .then((response)=>{
                        this.setState(()=>({question:response.data,isLoaded:true}))
                        console.log(response.data)
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
      render() {
    const { classes } = this.props;
     return (
        <React.Fragment>
            {this.state.isLoaded&&
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography gutterBottom component="h5" variant="h5" align="center">
                            Question Details
                        </Typography>
                        <React.Fragment>
                            <hr />
                            <React.Fragment>
                                
                                    <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                        <Grid item xs={3} className={classes.label} >
                                            <Typography variant="button" gutterBottom>
                                           Title::
                                            </Typography>
                                        </Grid>
                                       <Grid item xs={7}> 
                                            {this.state.question.title}
                                            
                                        </Grid> 
                                        <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" ></Grid>
                                        <Grid item xs={3} className={classes.label} >
                                            <Typography variant="button" gutterBottom>
                                           category::
                                            </Typography>
                                        </Grid>
                                       <Grid item xs={7}> 
                                            {this.state.question.subCategory.name}
                                            
                                        </Grid> 
                                    </Grid>
                                    
                                    <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                    <Grid item xs={3} className={classes.label} >
                                            <Typography variant="button" gutterBottom>
                                           Options::
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7}> 
                                        <ul>
                                            {this.state.question.options.map(option=>{
                                                return <li key={option._id}>{option.option.name}</li>
                                            })}
                                            </ul>
                                            
                                        </Grid> 
                                    </Grid>
                                    <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                    <Grid item xs={3} className={classes.label} >
                                            <Typography variant="button" gutterBottom>
                                           ThresholdKey::
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7}> 
                                       {this.state.question.thresholdKey}
                                            
                                        </Grid> 
                                    </Grid>
                                    <Grid container spacing={0} alignItems="center" justify="center">
                                        <div className={classes.buttons}>
                                        <Link to='/question/list'>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                //onClick={this.handleBack}
                                                className={classes.button}
                                                fullWidth>
                                                Back
                                            </Button>
                                            </Link>
                                            </div>
                                            </Grid>
                                    </React.Fragment>
                                    </React.Fragment>
                                    </Paper>
                                    </main>}
                                    </React.Fragment>
    );
  }
}
      
  QuestionDisplay.propTypes = {
            classes: PropTypes.object.isRequired,
          };
          
          export default withStyles(styles)(QuestionDisplay);