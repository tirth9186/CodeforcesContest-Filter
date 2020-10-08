import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
const DataList = (props) => {
    const { data } = props;
    const CellFormatter = (cell, row) => {
        return (<div><a target="_blank" rel="noopener noreferrer" href={"https://codeforces.com/problemset/problem/" + row.problem.contestId + "/" + row.problem.index}>{cell}</a></div>);
    };
    const columns = [
        { dataField: 'id', text: 'Id', sort: true },
        { dataField: 'problem.name', text: 'Name', sort: true,formatter:CellFormatter },
        { dataField: 'problem.index', text: 'Level', sort: true },
        { dataField: 'author.participantType', text: 'Type', sort: true },
        { dataField: 'programmingLanguage', text: 'Lang', sort: true },
        { dataField: 'verdict', text: 'Verdict', sort: true },
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
export default DataList;