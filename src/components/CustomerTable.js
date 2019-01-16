import React from 'react'

import Paper from '@material-ui/core/Paper'
import {SortingState, IntegratedSorting, PagingState, CustomPaging, SearchState, RowDetailState} from '@devexpress/dx-react-grid'
import {Grid, Table, TableHeaderRow, PagingPanel, Toolbar, SearchPanel, TableRowDetail} from '@devexpress/dx-react-grid-material-ui'

import {firestore} from '../firebase'
import {Loading} from './loading.js'
const RowDetail = ({ row }) => (
  <div>
    Address for
    {' '}
    {row.name}
  </div>
);

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
      loading: false,
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
    this.changeCurrentPage = this.changeCurrentPage.bind(this)
    this.changeSearchValue = this.changeSearchValue.bind(this)
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
    const {sorting, currentPage, pageSize, searchValue} = this.state
    const current = {sorting, currentPage,pageSize,searchValue}
    if(sorting !== prevState.sorting
      || currentPage !== prevState.currentpage
      || searchValue !== prevState.searchValue
      || pageSize !== prevState.pageSize){
        console.log(1)
        firestore.getCustomers(sorting[0], currentPage, pageSize, searchValue, data=>this.setState(data))
    }
  }

  componentDidMount() {
    const {sorting, currentPage, pageSize,searchValue} = this.state
    //firestore.getCustomers(sorting[0], currentPage, pageSize, searchValue, data=>this.setState(data))
  }

  render() {
    const {
      columns,
      rows,
      sorting,
      currentPage,
      totalCount,
      pageSize,
      pageSizes,
      expandedRowIds,
      loading
    } = this.state
    return (<Paper style={{
        position: 'relative'
      }}>
      <Grid rows={rows} columns={columns}>
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
        <Toolbar />
        <SearchPanel />
        <TableRowDetail
            contentComponent={RowDetail}
        />
        <PagingPanel pageSizes = {pageSizes} />
      </Grid>
      {loading && <Loading />}
    </Paper>)
  }
}

export default CustomerTable
