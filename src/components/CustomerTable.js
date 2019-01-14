import React from 'react'
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'

class CustomerTable extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      columns: [
        {name: 'name', title: 'Name'},
        {name: 'phone', title: 'Phone Number'},
        {name: 'email', title: 'Email Address'}
      ],
      rows: [],
      sorting: [{columnName: 'name',direction: 'asc'}]

    }
    this.changeSorting = sorting => this.setState({ sorting })
  }

  render(){
    const {columns, rows, sorting } = this.state
    return(
      <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <IntegratedSorting />
          <Table />
          <TableHeaderRow showSortingControls />
      </Grid>

    )
  }

}

export default CustomerTable
