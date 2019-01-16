import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Layout from '../components/layout'
import SEO from '../components/SEO'

class Order extends React.Component {

  render() {
  const {classes} = this.props
    return (
      <Layout title='Orders'>
      <SEO title="Report" keywords={[`gatsby`, `application`, `react`]} />
        <main>
          <div />
          <Typography variant="h4" gutterBottom component="h2">
            Orders
          </Typography>
          <div></div>
        </main>
      </Layout>)
  }
}

export default Order
