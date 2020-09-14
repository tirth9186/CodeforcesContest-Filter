import React from 'react';
import { DropdownButton,Dropdown } from 'react-bootstrap';
const ContestCategory = (props) => {
    const handleSelect = (e) => {
        console.log(e.target.value);
        props.setContestCategory(e.target.value);
    }
    return (
        // < select value={props.category} onChange={handleSelect} >
        //     <option value={"All"}>All</option>
        //     <option value={"Div. 1 + Div. 2"}>Div. 1 + Div. 2</option>
        //     <option value={"Div. 2"}>Div. 2</option>
        //     <option value={"Div. 3"}>Div. 3</option>
        //     <option value={"Educational"}>Educational</option>
        // </select >

        <DropdownButton title="Contest Category">
            <Dropdown.Item as="button" value="All" onClick={handleSelect}>All</Dropdown.Item>
            <Dropdown.Item as="button" value="Div. 1 + Div. 2" onClick={handleSelect}>Div. 1 + Div. 2</Dropdown.Item>
            <Dropdown.Item as="button" value="Div. 2" onClick={handleSelect}>Div. 2</Dropdown.Item>
            <Dropdown.Item as="button" value="Div. 3" onClick={handleSelect}>Div. 3</Dropdown.Item>
            <Dropdown.Item as="button" value="Educational" onClick={handleSelect}>Educational</Dropdown.Item>
        </DropdownButton>

    );
};

export default ContestCategory;