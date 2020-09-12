
import React from 'react';

function ContestType(props) {

    const handleSelect=(e)=>{
        props.setContestType(e.target.value);
    }
    return (
        <div>
        <select value={props.type} onChange={handleSelect}>
            <option value="All" >All</option>
            <option value="CF" >CF</option>
            <option value="IOI" >IOI</option>
            <option value="ICPC" >ICPC</option>  
        </select>
        </div>
    );
}

export default ContestType;