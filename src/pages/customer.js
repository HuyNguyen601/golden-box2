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
import {styles} from '../utils/styles'
//firebase
import {firestore} from '../firebase'

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
    this.valid = {
      all: false,
      name: false,
      phone: false,
      address: false,
      email: true
    }
    //this address to add to firestore
    this.address = {}
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
      email: this.state.email,
      address: this.address
    }
    firestore.addCustomer(row)
    this.setState({
      name: '',
      phone: '',
      email: '',
      address: '',
      row: row
    })

  }
  //type: enum of "name", "phone", "email", "address"
  handleChange= type=>e=>{
    //check validity for each input
    this.valid[type] = type !== 'address' ? e.target.checkValidity() : false
    this.valid.all = true
    for(let property in this.valid){
      if(this.valid[property] === false){
        this.valid.all = false
      }
    }
    //allow only number in phone input
    if(type!=="phone" || !isNaN(e.target.value))
    {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  componentDidMount(){
    //place.js only work in the browser, so we have to require it here
    options.container = document.querySelector('#outlined-address')
    const isBrowser = typeof window !== 'undefined'
    const Places = isBrowser ? require('places.js') : undefined
    const autoComplete = Places(options)
    //put event on change to get data for address
    autoComplete.on('change',e=>{
      //check validity again
      this.valid.address = true
      this.valid.all = true
      for(let property in this.valid){
        if(this.valid[property] === false){
          this.valid.all = false
        }
      }

      this.address = {
        value: e.suggestion.value,
        street: e.suggestion.name,
        city: e.suggestion.city,
        county: e.suggestion.county,
        zip: e.suggestion.postcode
      }
    })


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
              type='email'
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
