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


class QuestionShow extends React.Component {
  constructor() {
      super()
      this.state = {
          question: []
      }

  }
  componentDidMount() {
      axios.get("/question")
          .then(response => {
              console.log(response.data)
              const question = response.data
              this.setState(() => ({ question }))
          })
          .catch(err => {
              console.log(err)
          })
  }
  handleDelete = (id) => {
      const confirmDelete = window.confirm("Are you Sure ??")
      //const id = this.state.question._id

      if (confirmDelete) {

          axios.delete(`/question/${id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
              .then((response) => {
                  //console.log(response)
                  this.props.history.push('/question')
              })
              .catch((err) => {
                  console.log(err)
              })
      }
  }

    render() {
        const { classes } = this.props
        const { question } = this.state
        // console.log('isLoaded',isLoaded)
        const data = question.map(item => {

                return {

                    id: item._id,
                    name: item.title,
                    category:item.subCategory.name

                }



        })
        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>



                        <MaterialTable
                            columns={[
                                {
                                    title: 'Question', field: 'name',
                                   
                                    cellStyle: {
                                        fontSize: "14px",
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontWeight: 600
                                    }
                                },
                                {
                                            title: 'Category', field: 'category',
                                           
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
                                axios.delete(`/question/${oldData.id}`, { headers: { 'x-auth': localStorage.getItem('token') } })
                                    .then((response) => {
                                        //console.log('inside',response)
                                        let data = this.state.question;
                                        //console.log('data',data)
                                        const index = data.findIndex(item=> item._id === oldData.id);
                                        //console.log("index",index)
                                        data.splice(index, 1);
                                        this.setState({ question:data })
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })


                               }}
                            title="Question List"
                            actions={[

                                // {
                                //     icon: 'add_box',
                                //     tooltip: 'AddQuestion',
                                //     onClick: (event, rowData) => {
                                //         this.props.history.push(`/question/new`)
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
                                        this.props.history.push(`/question/edit/${rowData.id}`)
                                    },
                                    iconProps: {
                                        style: {
                                          fontSize: 24,
                                          color: 'black',
                                        },
                                    },
                                },
                                {
                                    icon: 'show_box',
                                    tooltip: 'Show',
                                    onClick: (event, rowData) => {
                                        this.props.history.push(`/question/show/${rowData.id}`)
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
                        this.props.history.push('/question/new')
                    }}>AddQuestion</Button>
                </main>
            </React.Fragment>
        )
    }
}

QuestionShow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionShow);