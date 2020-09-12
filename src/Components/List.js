import React from 'react';

const List =  (props)=>{
        const { contests } = props;
    if (contests !== null) {
        if (contests.status !== "OK")
            return <p>Some Problem in loading data...</p>
        return (
            <ul>
                <h2>All Contest List</h2>
                <p>{}</p>
                {
                    contests.result.map(contest => { 
                        return (
                            <li>
                                <a href={`https://codeforces.com/contest/${contest.id}`}><span>{contest.id} - {contest.name} - {contest.type} - {contest.difficulty}</span></a>
                            </li>
                        );
                    })

                }
            </ul>
        );
    }
    return (
      <p>Wait...</p>  
    );
        
}
export default List;