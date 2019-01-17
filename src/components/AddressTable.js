import React from 'react'
import {firestore} from '../firebase'
import {Grid, Table, TableHeaderRow} from '@devexpress/dx-react-grid-material-ui'
import {Loading} from './loading.js'



class AddressTable extends React.Component {

  constructor(props){
    super(props)
    this.state= {
      rows: [],
      loading: true
    }
  }


  componentDidMount(){
    const {row} = this.props
    firestore.getAddress(row.id).then(rows=>this.setState({
      rows: rows,
      loading: false
    }))
  }

  render(){
    const {rows, loading} = this.state
    return (
      <div>
        <Grid
          columns = {[
            {name: 'street', title:'Address'},
            {name: 'city', title:'City'},
            {name: 'county', title: 'County'},
            {name: 'zip', title: 'Zip Code'}
          ]}
          rows = {rows}
        >
          <Table />
          <TableHeaderRow/>
        </Grid>
        {loading && <Loading />}
      </div>
    )
  }
}

export default AddressTable
