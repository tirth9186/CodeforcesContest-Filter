import React from 'react';
import List from './List'

function ListLoading() {
    return function LodingComponent({ isLoading, contests }) {
        if (!isLoading) return <List contests={contests} />;
        return (
            <p> Wait, Fetching data may take some time..</p>
        );
    };
}
export default ListLoading;