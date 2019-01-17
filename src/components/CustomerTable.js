import React from 'react'

import Paper from '@material-ui/core/Paper'
import {SortingState, IntegratedSorting, PagingState, CustomPaging, SearchState, RowDetailState, SelectionState} from '@devexpress/dx-react-grid'
import {Grid, Table, TableHeaderRow, TableColumnVisibility, PagingPanel, Toolbar, SearchPanel, TableRowDetail, TableSelection} from '@devexpress/dx-react-grid-material-ui'

import {firestore} from '../firebase'
import {Loading} from './loading.js'

import AddressTable from './AddressTable'
import CustomerDialog from './CustomerDialog'
//content of RowDetail
//table of Addresses for this customer
//Using rowid to retrieve exact customer document, then get all from Address Collection
const RowDetail = ({ row }) => (<AddressTable row={row} />)


class CustomerTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          name: 'id',
          title: 'ID'
        }, {
          name: 'name',
          title: 'Name'
        }, {
          name: 'phone',
          title: 'Phone Number'
        }, {
          name: 'email',
          title: 'Email Address'
        }
      ],
      rows: [],
      totalCount: 0,
      pageSize: 5,
      pageSizes: [5, 10, 15, 20],
      currentPage: 0,
      searchValue: '',
      expandedRowIds: [],
      open: false, //to open the dialog
      loading: false,
      selection: [],
      sorting: [
        {
          columnName: 'name',
          direction: 'asc'
        }
      ]

    }
    this.changeSorting = sorting => this.setState({sorting})
    this.changePageSize = pageSize =>this.setState({pageSize})
    this.changeExpandedDetails = expandedRowIds => this.setState({ expandedRowIds })
    this.changeSelection = this.changeSelection.bind(this)
    this.changeCurrentPage = this.changeCurrentPage.bind(this)
    this.changeSearchValue = this.changeSearchValue.bind(this)
  }

  changeSelection(selection){
    const lastSelection = selection.slice(-1)
    this.setState({
      selection: lastSelection,
      open: true
    })
  }
  changeCurrentPage(currentPage) {
    this.setState({
      loading: true,
      currentPage,
    });
  }
  changeSearchValue(searchValue) {
    this.setState({
      loading: true,
      searchValue,
    });
  }

  componentDidUpdate(prevProps,prevState) {
    const {sorting, currentPage, pageSize, searchValue, expandedRowIds,rows} = this.state
    if(sorting !== prevState.sorting
      || currentPage !== prevState.currentPage
      || searchValue !== prevState.searchValue
      || pageSize !== prevState.pageSize){
        console.log('Updated')
        this.setState({
          expandedRowIds: []
        })
        firestore.getCustomers(sorting[0], currentPage, pageSize, searchValue, data=>this.setState(data))
    }
  }

  componentDidMount() {
    const {sorting, currentPage, pageSize,searchValue} = this.state
    console.log('Mounted')
    firestore.getCustomers(sorting[0], currentPage, pageSize, searchValue, data=>this.setState(data))
  }

  render() {
    const {
      columns,
      open,
      rows,
      sorting,
      currentPage,
      totalCount,
      pageSize,
      pageSizes,
      expandedRowIds,
      selection,
      loading
    } = this.state
    return (<Paper style={{
        position: 'relative'
      }}>
      <Grid rows={rows} columns={columns}>
        <SelectionState
            selection={selection}
            onSelectionChange={this.changeSelection}
          />
        <RowDetailState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={this.changeExpandedDetails}
        />
        <PagingState currentPage={currentPage}
          onCurrentPageChange={this.changeCurrentPage}
          pageSize={pageSize}
          onPageSizeChange={this.changePageSize}/>
        <CustomPaging totalCount={totalCount}/>
        <SearchState
            onValueChange={this.changeSearchValue}
        />
        <SortingState sorting={sorting} onSortingChange={this.changeSorting}/>
        <IntegratedSorting/>
        <Table/>
        <TableHeaderRow showSortingControls/>
        <TableSelection
            selectByRowClick
            highlightRow
            showSelectionColumn={false}
          />
        <TableColumnVisibility
            defaultHiddenColumnNames={['id']}
          />
        <Toolbar />
        <SearchPanel />
        <TableRowDetail
            contentComponent={RowDetail}
        />
        <PagingPanel pageSizes = {pageSizes} />
      </Grid>
      {loading && <Loading />}
      <CustomerDialog open={open} row={rows[selection[0]]} handleClose={()=>this.setState({open: false})}/>
    </Paper>)
  }
}

export default CustomerTable
