import React from 'react';
function ChartLoading() {
    return function ChartComponent({ isLoading, Chart,options }) {
        console.log(options);
        if (!isLoading) {
            return <Chart options={options} />;
        }
        return (<div></div>);
    };
}
export default ChartLoading;