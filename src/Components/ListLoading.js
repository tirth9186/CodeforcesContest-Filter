import React from 'react';
// import List from './List';
import { Button, Spinner } from 'react-bootstrap';
function ListLoading() {
    return function LodingComponent({ isLoading,List,data}) {
        if (!isLoading) return <List data={data}/>;
        return (
            <Button className="center" disabled className="mr-4" variant="primary">
                <h2><Spinner className="mr-5" animation="border" /> Loading........</h2>
            </Button>
        );
    };
}
export default ListLoading;