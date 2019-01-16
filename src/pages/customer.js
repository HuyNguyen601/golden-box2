import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


//algolia places
//import Places from 'places.js'
import {options} from '../config/config.js'

import Layout from '../components/layout'
import SEO from '../components/seo'
import CustomerTable from '../components/CustomerTable'

//firebase
import {firestore} from '../firebase'

const styles = theme =>({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
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
      address:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.addCustomer = this.addCustomer.bind(this)
    this.clearCustomer = ()=>this.setState({
      name: '',
      phone: '',
      email: '',
      address: ''
    })

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
      row: row
    })

  }
  handleChange= name=>e=>{
    this.setState({
      [name]: e.target.value
    })
  }

  componentDidMount(){
    options.container = document.querySelector('#outlined-address')
    const isBrowser = typeof window !== 'undefined'
    const Places = isBrowser ? require('places.js') : undefined
    Places(options)


  }

  render() {
  const {classes} = this.props
    return (
      <Layout title='Customer' >
        <SEO title="Customer" keywords={[`gatsby`, `application`, `react`]} />

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
        </form>
        <TextField
          id="outlined-address"
          label="Address"
          className={classes.textField}
          value={this.state.address}
          onChange={this.handleChange('address')}
          margin="normal"
          variant='outlined'
          required
          style={{width: '600px'}}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size='large'
          style={{marginTop:'20px', marginLeft: '20px'}}
          onClick={this.addCustomer}
        >
          Add
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          size='large'
          style={{marginTop:'20px', marginLeft: '20px'}}
          onClick={this.clearCustomer}
        >
          Clear
        </Button>

        <Typography variant="h4" gutterBottom component="h2">
          Customer Table
        </Typography>
        <Typography component="div" className={classes.tableContainer}>
          <CustomerTable/>
        </Typography>
    </main>
  </Layout>)
  }
}

export default withStyles(styles)(Customer)
