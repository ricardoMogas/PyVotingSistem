import React from 'react';


const GraphPage = () => {
    // Sample data for the graph
    const data = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 200 },
        { name: 'Apr', value: 500 },
        { name: 'May', value: 600 },
        { name: 'Jun', value: 800 },
    ];

    return (
        <>
            <h1 style={{ textAlign: 'center', color: 'blue' }}>Resultados Page</h1>
            <p style={{ fontSize: '18px', textAlign: 'center' }}>This is the graph page</p>
            {/* Add your graph component here */}
        </>
    );
};

export default GraphPage;