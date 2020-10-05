import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './tablestyle.css';
const ContestList =  (props)=>{
    const { data } = props;
    const CellFormatter = (cell, row) => {
        return (<div><a target="_blank" rel="noopener noreferrer" href={"https://codeforces.com/contest/" + row.id}>{cell}</a></div>);
    };
    const columns = [
        { dataField: 'id', text: 'Id', sort: true },
        { dataField: 'name', text: 'Name', formatter: CellFormatter, sort: true },
        { dataField: 'type', text: 'Type', sort: true },
    ];

    if (data !== null) {
        if (data.status !== "OK")
            return <p>Some Problem in loading data...</p>
        else { 
            return <BootstrapTable wrapperClasses="mytable" hover striped keyField='id' data={data.result} columns={columns} pagination={paginationFactory()} />;
        }
    }
    return (
      <p>Wait...</p>  
    );
        
}
export default ContestList;