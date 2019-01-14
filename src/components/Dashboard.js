import React from 'react'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'

const styles = theme=>({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
})
class Dashboard extends React.Component {

  render() {
    const {classes} = this.props

    return (<main className={classes.content}>
      <div className={classes.appBarSpacer}/>
      <Typography variant="h4" gutterBottom component="h2">
        Orders
      </Typography>
      <Typography component="div" className={classes.chartContainer}></Typography>
      <Typography variant="h4" gutterBottom component="h2">
        Products
      </Typography>
      <div className={classes.tableContainer}></div>
    </main>)
  }
}

export default withStyles(styles)(Dashboard)
