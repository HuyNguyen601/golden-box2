import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Layout from '../components/layout'


const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto'
  },
})
class Order extends React.Component {

  render() {
    const {classes} = this.props

    return (
      <Layout title='Orders'>
        <main className={classes.content}>
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
