import React from 'react'
import MaterialTable from 'material-table'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import {Button} from 'reactstrap'
import axios from '../../config/axios';


const styles = theme => ({

    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: "50%",
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.down(600 + theme.spacing.unit * 2 * 2)]: {
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


class OptionShow extends React.Component {
  constructor() {
      super()
      this.state = {
          options: []
      }

  }
  componentDidMount() {
      axios.get("/option")
          .then(response => {
              //console.log(response.data)
              const options = response.data
              this.setState(() => ({ options }))
          })
          .catch(err => {
              console.log(err)
          })
  }
  handleDelete = (id) => {
      const confirmDelete = window.confirm("Are you Sure ??")
      //const id = this.state.option._id

      if (confirmDelete) {

          axios.delete(`/option/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
              .then((response) => {
                  //console.log(response)
                  this.props.history.push('/option')
              })
              .catch((err) => {
                  console.log(err)
              })
      }
  }

    render() {
        const { classes } = this.props
        const { options } = this.state
        // console.log('isLoaded',isLoaded)
        const data = options.map(option => {

                return {

                    id: option._id,
                    name: option.name,
                    points:option.points

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
                                    title: 'Points', field: 'points',
                                    cellStyle: {
                                        fontSize: "14px",
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 600
                                    }
                                },

                            ]}
                            data={data}
                              editable={{
                                onRowDelete: oldData =>
                                axios.delete(`/option/${oldData.id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
                                    .then((response) => {
                                        //console.log('inside',response)
                                        let data = this.state.options;
                                        //console.log('data',data)
                                        const index = data.findIndex(item=> item._id === oldData.id);
                                        //console.log("index",index)
                                        data.splice(index, 1);
                                        this.setState({ options:data })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })


                               }}
                            title="option List"
                            actions={[

                                // {
                                //     icon: 'add_box',
                                //     tooltip: 'Add option',
                                //     onClick: (event, rowData) => {
                                //         this.props.history.push(`/option/new`)
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
                                        this.props.history.push(`/option/edit/${rowData.id}`)
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
                        this.props.history.push('/option/new')
                    }}>AddOption</Button>
                </main>
            </React.Fragment>
        )
    }
}

OptionShow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OptionShow);