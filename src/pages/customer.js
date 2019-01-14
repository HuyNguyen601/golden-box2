import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Layout from '../components/layout'
import CustomerTable from '../components/CustomerTable'


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
      name: '',
      phone:'',
      email:'',
      address:''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange= name=>e=>{
    this.setState({
      [name]: e.target.value
    })
  }

  render() {
    const {classes} = this.props

    return (
      <Layout title='Customer'>
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
            >
              Add
            </Button>
        </form>

        <Typography variant="h4" gutterBottom component="h2">
          Customer Table
        </Typography>
        <Typography component="div" className={classes.tableContainer}>
          <CustomerTable />
        </Typography>


    </main>
  </Layout>)
  }
}

export default withStyles(styles)(Customer)
