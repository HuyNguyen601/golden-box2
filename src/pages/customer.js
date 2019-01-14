import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

import Layout from '../components/layout'

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
})
class Customer extends React.Component {

  render() {
    const {classes} = this.props

    return (
      <Layout title='Customer'>
        <main className={classes.content}>
          <div className={classes.appBarSpacer}/>
          <Typography variant="h4" gutterBottom component="h2">
            Customer
          </Typography>
    </main>
  </Layout>)
  }
}

export default withStyles(styles)(Customer)
