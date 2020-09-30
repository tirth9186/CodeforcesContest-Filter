import React from 'react';
import { Table } from 'react-bootstrap';

const ProblemList = (props) => {
    const { data } = props;
    if (data !== null) {
        if (data.status !== "OK")
            return <p>Some Problem in loading data...</p>
        return (
            <ul>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ContestID</th>
                            <th>Level</th>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Submissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.problems.map(problem => {
                                return (
                                    <tr>
                                        <td>{problem.problemData.contestId}</td>
                                        <td>{problem.problemData.index}</td>
                                        <td><a target="_blank" href={`https://codeforces.com/problemset/problem/${problem.problemData.contestId}/${problem.problemData.index}`}>{problem.problemData.name}</a></td>
                                        <td>{problem.problemData.rating}</td>
                                        <td>{problem.submissions}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </ul>
        );
    }
    return (
        <p>Wait...</p>
    );

}
export default ProblemList;