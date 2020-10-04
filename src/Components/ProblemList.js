import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import './tablestyle.css'
const ProblemList = (props) => {
    const { data } = props;
    let problemsArr = [];
    const CellFormatter = (cell, row, rowIndex, formatExtraData) => {
        return (<div><a href={"https://codeforces.com/problemset/problem/" + row.contestId + "/" + row.index}>{cell}</a></div>);
    };
    const columns = [
        { dataField: 'contestId', text: 'ContestId'},
        { dataField: 'index', text: 'Level' },
        { dataField: 'name', text: 'Name', formatter: CellFormatter},
        { dataField: 'rating', text: 'Rating' },
        { dataField: 'submissions', text: 'Submissions' }
    ];

    const formatData = (data) => {
        problemsArr = data.problems.map((problem, index) => {
            return (
                {
                    'id': index,
                    'contestId': problem.problemData.contestId,
                    'index': problem.problemData.index,
                    'name': problem.problemData.name,
                    'rating': problem.problemData.rating,
                    'submissions': problem.submissions
                }
            );
        })
    }

    if (data !== null) {
        if (data.status !== "OK")
            return <p>Some Problem in loading data...</p>
        else {
            formatData(data);
            return (
                <BootstrapTable bootstrap4 wrapperClasses="table-responsive mytable" hover striped keyField='id' data={problemsArr} columns={columns} pagination={paginationFactory()}/>
            );
        }
    }
    return (
        <p>Wait...</p>
    );

}
export default ProblemList;