import React from 'react';
import List from './List';
import { Alert, Button, Spinner } from 'react-bootstrap';
function ListLoading() {
    return function LodingComponent({ isLoading, contests }) {
        if (!isLoading) return <List contests={contests} />;
        return (
            <Button className="center" disabled className="mr-4" variant="primary">
                <h2><Spinner className="mr-5" animation="border" /> Loading........</h2>
            </Button>
        );
    };
}
export default ListLoading;