import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import Dashboard from '../components/dashboard'


const IndexPage = () => (
<Layout title='Dashboard'>
  <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
  
</Layout>
)

export default IndexPage
