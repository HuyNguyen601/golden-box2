import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Dashboard from '../components/dashboard'


const IndexPage = () => (
<Layout title='Dashboard'>
  <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
  <Dashboard/>
</Layout>
)

export default IndexPage
