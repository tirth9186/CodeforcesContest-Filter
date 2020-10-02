import React from 'react';
import { Table } from 'react-bootstrap';

const ContestList =  (props)=>{
        const { data } = props;
    if (data !== null) {
        if (data.status !== "OK")
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
                    data.result.map((contest,index) => { 
                        return (
                            <tr key={index}>
                                <td>{contest.id}</td>
                                <td><a target="_blank" rel="noopener noreferrer" href={`https://codeforces.com/contest/${contest.id}`}>{contest.name}</a></td>
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
export default ContestList;