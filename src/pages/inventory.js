import React from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment';
import Layout from '../components/layout'
import SEO from '../components/seo'
import {styles} from '../utils/styles'


class Inventory extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      qty: 1,
      price:0,
      sn: ['']
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = type=>e=>{
    const sn = []
    if(type==='qty'){
      if(e.target.value >= 10)
        return
      else {
        for(let i =0;i<e.target.value;i++){
          sn.push('')
        }
        this.setState({
          sn: sn
        })
      }
    }
    this.setState({
      [type]: e.target.value
    })
  }

  render() {
  const {classes} = this.props
  const {name,qty,price,sn} = this.state
    return (
      <Layout title='Inventory'>
      <SEO title="Inventory" keywords={[`gatsby`, `application`, `react`]} />
        <main className ={classes.content}>
          <div className={classes.appBarSpacer}/>
          <Typography variant="h4" gutterBottom component="h2">
            Add New Item
          </Typography>
          <form className = {classes.containter} noValidate autoComplete='off'>
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={name}
              onChange={this.handleChange('name')}
              margin="normal"
              variant='outlined'
              required
            />
            <TextField
              id="outlined-qty"
              label="Qty"
              className={classes.textField}
              value={qty}
              onChange={this.handleChange('qty')}
              margin="normal"
              variant='outlined'
              type="number"
              required
            />
            <TextField
              id="outlined-price"
              label="Price"
              className={classes.textField}
              value={price}
              onChange={this.handleChange('price')}
              InputProps={{
                startAdornment: (
                  <InputAdornment variant="outlined" position="start">
                    $
                  </InputAdornment>
                ),
              }}
              margin="normal"
              variant='outlined'
              required
            />
          </form>
          {sn.map(text=>(
            <TextField
              key={sn.indexOf(text)}
              id={"outlined-SN"+sn.indexOf(text)}
              label={"Serial Number No."+(sn.indexOf(text)+1)}
              className={classes.textField}
              value={text}
              onChange={this.handleChange('sn')}
              margin="normal"
              variant='outlined'
              required
            />
          ))}
        </main>
      </Layout>)
  }
}

export default withStyles(styles)(Inventory)
