import React from 'react';
import { Table } from 'react-bootstrap';

const List =  (props)=>{
        const { contests } = props;
    if (contests !== null) {
        if (contests.status !== "OK")
            return <p>Some Problem in loading data...</p>
        return (
            <ul>
                <h2>All Contest List</h2>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    contests.result.map(contest => { 
                        return (
                            <tr>
                                <td>{contest.id}</td>
                                <td><a href={`https://codeforces.com/contest/${contest.id}`}>{contest.name}</a></td>
                                <td>{contest.type}</td>
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
export default List;