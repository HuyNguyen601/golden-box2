import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Layout from '../components/layout'
import CustomerTable from '../components/CustomerTable'

//firebase
import {firestore} from '../firebase'


const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
   display: 'flex',
   flexWrap: 'wrap',
 },
 textField: {
   marginLeft: theme.spacing.unit,
   marginRight: theme.spacing.unit,
   width: 300,
 },
})
class Customer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      row: {},
      name: '',
      phone:'',
      email:'',
      key: 0,
      address:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.addCustomer = this.addCustomer.bind(this)
  }
  addCustomer = e=>{
    const row = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email
    }
    firestore.addCustomer(row)
    this.setState({
      name: '',
      phone: '',
      email: '',
      row: row,
      key: this.state.key === 0 ? 1 :0
    })

  }
  handleChange= name=>e=>{
    this.setState({
      [name]: e.target.value
    })
  }

  render() {
    const {classes} = this.props

    return (
      <Layout title='Customer' >
        <main className={classes.content}>
          <div className={classes.appBarSpacer}/>
          <Typography variant="h4" gutterBottom component="h2">
            Add New Customer
          </Typography>
          <form className = {classes.containter} noValidate autoComplete='off'>
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              variant='outlined'
              required
            />
            <TextField
              id="outlined-phone"
              label="Phone"
              className={classes.textField}
              value={this.state.phone}
              onChange={this.handleChange('phone')}
              margin="normal"
              variant='outlined'
              required
            />
            <TextField
              id="outlined-email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
              variant='outlined'
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              size='large'
              style={{marginTop:'20px'}}
              onClick={this.addCustomer}
            >
              Add
            </Button>
        </form>

        <Typography variant="h4" gutterBottom component="h2">
          Customer Table
        </Typography>
        <Typography component="div" className={classes.tableContainer}>
          <CustomerTable key={this.state.key}/>
        </Typography>


    </main>
  </Layout>)
  }
}

export default withStyles(styles)(Customer)
