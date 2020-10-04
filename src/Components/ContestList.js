import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const ContestList =  (props)=>{
    const { data } = props;
    const CellFormatter = (cell, row) => {
        return (<div><a href={"https://codeforces.com/contest/" + row.id}>{cell}</a></div>);
    };
    const columns = [
        { dataField: 'id', text: 'Id' },
        { dataField: 'name', text: 'Name', formatter: CellFormatter },
        { dataField: 'type', text: 'Type' },
    ];

    if (data !== null) {
        if (data.status !== "OK")
            return <p>Some Problem in loading data...</p>
        else { 
            return <BootstrapTable hover striped keyField='id' data={data.result} columns={columns} pagination={paginationFactory()} />;
        }
    }
    return (
      <p>Wait...</p>  
    );
        
}
export default ContestList;