import React from 'react';

const ContestCategory = (props) => {
    const handleSelect = (e) => {
        props.setContestCategory(e.target.value);
    }
    return (
        < select value={props.category} onChange={handleSelect} >
            <option value={"All"}>All</option>
            <option value={"Div. 1 + Div. 2"}>Div. 1 + Div. 2</option>
            <option value={"Div. 2"}>Div. 2</option>
            <option value={"Div. 3"}>Div. 3</option>
            <option value={"Educational"}>Educational</option>
        </select >

    );
};

export default ContestCategory;