import React from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import {Button} from 'reactstrap'
import axios from '../../config/axios';


const styles = theme => ({

    layout: {
        width: '1000',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(1000 + theme.spacing.unit * 2 * 2)]: {
            width: "90%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.down(1000 + theme.spacing.unit * 2 * 2)]: {
            width: "80%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        background: "#000066",
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {

            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 0.5,
        },
        [theme.breakpoints.down(600 + theme.spacing.unit * 3 * 2)]: {

            marginTop: theme.spacing.unit * 6,
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 0.5,
        },
    },
    cell: {

    }
})


class ChildShow extends React.Component {
  constructor() {
      super()
      this.state = {
          children: [],
          loadFail:true
      }

  }
  componentDidMount() {
      axios.get("/child",{
        headers : {
            'x-auth' : localStorage.getItem('authToken')
        
        }})
          .then(response => {
              console.log(response.data)
             
              
              const children = response.data
              this.setState(() => ({ children }))
          })
          .catch(err => {
              console.log(err)
          })
  }
  handleDelete = (id) => {
      const confirmDelete = window.confirm("Are you Sure ??")
      //const id = this.state.question._id

      if (confirmDelete) {

          axios.delete(`/child/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
              .then((response) => {
                  //console.log(response)
                  this.props.history.push('/child')
              })
              .catch((err) => {
                  console.log(err)
              })
      }
  }

    render() {
        const { classes } = this.props
        const { children } = this.state
        // console.log('isLoaded',isLoaded)
                
        const data = children.map(child => {

                return {

                    id: child._id,
                    name: child.name,
                    gender:child.gender,
                    motherName:child.motherName,
                    phoneNumber:child.phoneNumber,
                    email:child.email


                }
        })
    
        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                       <MaterialTable
                            columns={[
                                {
                                    title: 'Name', field: 'name',
                                   
                                    cellStyle: {
                                        fontSize: "14px",
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 600
                                    }
                                },
                                {
                                    title: 'Gender', field: 'gender',
                                   
                                    cellStyle: {
                                        fontSize: "14px",
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 600
                                    }
                                },

                                {
                                            title: 'MotherName', field: 'motherName',
                                           
                                            cellStyle: {
                                                fontSize: "14px",
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontWeight: 600
                                            }
                                        },
                                        {
                                            title: 'PhoneNumber', field: 'phoneNumber',
                                           
                                            cellStyle: {
                                                fontSize: "14px",
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontWeight: 600
                                            }
                                        },
                                        {
                                            title: 'Email', field: 'email',
                                           
                                            cellStyle: {
                                                fontSize: "14px",
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontWeight: 600
                                            }
                                        }


                            ]}
                           
                            data={data}
                              editable={{
                                onRowDelete: oldData =>
                                axios.delete(`/child/${oldData.id}`, { headers: { 'x-auth': localStorage.getItem('authToken') } })
                                    .then((response) => {
                                        console.log('inside',response)
                                        let data = this.state.children;
                                        //console.log('data',data)
                                        const index = data.findIndex(item=> item._id === oldData.id);
                                        //console.log("index",index)
                                        data.splice(index, 1);
                                        this.setState({ children:data })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })


                               }}
                            title="Children List"
                            actions={[

                                // {
                                //     icon: 'add_box',
                                //     tooltip: 'AddChild',
                                //     onClick: (event, rowData) => {
                                //         this.props.history.push(`/child/new`)
                                //     },
                                //     iconProps: {
                                //         style: {
                                //             fontSize: 24,
                                //             color: 'black',
                                //         },
                                //     },
                                // },
                                {
                                    icon: 'edit',
                                    tooltip: 'Edit',
                                    onClick: (event, rowData) => {
                                        this.props.history.push(`/child/edit/${rowData.id}`)
                                    },
                                    iconProps: {
                                        style: {
                                          fontSize: 24,
                                          color: 'black',
                                        },
                                    },
                                },
                                {
                                    icon:'show_box',
                                    tooltip:'Show',
                                    onClick:(event,rowData)=>{
                                        this.props.history.push(`/child/${rowData.id}/assesment`)
                                    },
                                    iconProps: {
                                        style: {
                                          fontSize: 24,
                                          color: 'black',
                                        },
                                    },
                                }
                            ]}

                            options={{
                                actionsColumnIndex: -1,
                            }}

                        />

                    </Paper>
                    <Button outline color="primary" size="lg" onClick={()=>{
                        this.props.history.push('/child/new')
                    }}>AddChild</Button>
                </main>
            </React.Fragment>
        )
    }
}

ChildShow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChildShow);