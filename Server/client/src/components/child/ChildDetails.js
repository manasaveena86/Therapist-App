import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {Button} from 'reactstrap'
import moment from 'moment'
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
class ChildDetails extends React.Component{
    constructor(){
        super()
        this.state={
            child :{},
            assesmentDetails:[],
            noOfAssesmentsDone:0,
            isData:false,
            isLoaded:false
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        let assesments=[]
        const p1=axios.get('/assesmentResult')
        const p2=axios.get(`/child/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        Promise.all([p1,p2])
        .then((response)=>{
            const assesmentDetails=response[0].data
            let count=0
            assesmentDetails.forEach((data)=>{
                if(data.assesment.child===this.props.match.params.id){
                    assesments.push(data)
                    count++
               }
            })
            console.log('assesments array',assesments)
            this.setState(()=>({noOfAssesmentsDone:count,assesmentDetails:assesments,isData:true,child:response[1].data,isLoaded:true}))
            console.log(this.state.child)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    calage=(dob)=> { 
        //console.log(dob)
       var diff_ms = Date.now() - dob.getTime();
       var age_dt = new Date(diff_ms); 
     
       return Math.abs(age_dt.getUTCFullYear() - 1970);
   }

    render(){
        const { classes } = this.props;
       // console.log(this.state.assesmentDetails)
        return(
            <React.Fragment>
            {this.state.isLoaded&&
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography gutterBottom component="h5" variant="h5" align="center">
                            Child Details
                        </Typography>
                        <React.Fragment>
                            <hr />
                            <React.Fragment>
                                
                                    <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                        <Grid item xs={3} className={classes.label} >
                                            <Typography variant="button" gutterBottom>
                                           Name::
                                            </Typography>
                                        </Grid>
                                       <Grid item xs={7}> 
                                            {this.state.child.name}
                                            
                                        </Grid> 
                                        <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center">
                                        <Grid item xs={3} className={classes.label} >
                                        <Typography variant="button" gutterBottom>
                                        MotherName::
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={7}> 
                                            {this.state.child.motherName}
                                            
                                        </Grid> 
                                        </Grid>
                                        <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" ></Grid>
                                        <Grid item xs={3} className={classes.label} >
                                            <Typography variant="button" gutterBottom>
                                           MajorConcerns::
                                            </Typography>
                                        </Grid>
                                       <Grid item xs={7}> 
                                            {this.state.child.majorConcerns}
                                            
                                        </Grid> 
                                    </Grid>
                                    <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                    <Grid item xs={3} className={classes.label} >
                                            <Typography variant="button" gutterBottom>
                                           Email::
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7}> 
                                            {this.state.child.email}
                                            
                                        </Grid> 
                                    </Grid>
                                    <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                    <Grid item xs={3} className={classes.label} >
                                            <Typography variant="button" gutterBottom>
                                           PhoneNumber::
                                            </Typography>
                                        </Grid>
                                       <Grid item xs={7}> 
                                            {this.state.child.phoneNumber}
                                            
                                        </Grid> 
                                    </Grid>
                                {this.state.noOfAssesmentsDone!==0 &&   <Grid container spacing={24} className={classes.container} alignItems="baseline" justify="center" >
                                    <Grid item xs={3} className={classes.label} >
                                            <Typography variant="button" gutterBottom>
                                           Assessmetns Done::
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={7}> 
                                        <ul>
                                        {this.state.assesmentDetails.map((assesment,index)=>{
                                        
                                        //console.log(assesment.assesment)
                                        //console.log(assesment.assesment.assesmentDate)
                                        return <li key={index}><Link to={`/child/${this.props.match.params.id}/assesment/${assesment.assesment._id}`}>
                                        Assesment.{index+1} </Link>on --{moment(assesment.assesment.assesmentDate).format('YYYY/MM/DD')}</li>
                                        })}
                                        </ul>
                                        </Grid> 
                                    </Grid>}
                                    <Grid container spacing={0} alignItems="center" justify="center">
                                        <div className={classes.buttons}>
                                        <Link to='/child/list'>
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
      
  ChildDetails.propTypes = {
            classes: PropTypes.object.isRequired,
          };
   export default withStyles(styles)(ChildDetails);


          