import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
function ListLoading() {
    return function LodingComponent({ isLoading,List,data}) {
        if (!isLoading) return <List data={data}/>;
        return (
            <Button className="center mr-4" disabled variant="primary">
                <h2><Spinner className="mr-5" animation="border" /> Loading...</h2>
            </Button>
        );
    };
}
export default ListLoading;