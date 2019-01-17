import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Layout from '../components/layout'
import SEO from '../components/SEO'
import {styles} from '../utils/styles'

class Order extends React.Component {

  render() {
  const {classes} = this.props
    return (
      <Layout title='Orders'>
      <SEO title="Orders" keywords={[`gatsby`, `application`, `react`]} />
        <main className ={classes.content}>
          <div className={classes.appBarSpacer}/>
          <Typography variant="h4" gutterBottom component="h2">
            Orders
          </Typography>
          <div></div>
        </main>
      </Layout>)
  }
}

export default withStyles(styles)(Order)
