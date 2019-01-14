import React from 'react'
import Typography from '@material-ui/core/Typography'

class Dashboard extends React.Component {

  render() {
    const {classes} = this.props

    return (<main className={classes.content}>
      <div className={classes.appBarSpacer}/>
      <Typography variant="h4" gutterBottom="gutterBottom" component="h2">
        Orders
      </Typography>
      <Typography component="div" className={classes.chartContainer}></Typography>
      <Typography variant="h4" gutterBottom="gutterBottom" component="h2">
        Products
      </Typography>
      <div className={classes.tableContainer}></div>
    </main>)
  }
}

export default Dashboard
