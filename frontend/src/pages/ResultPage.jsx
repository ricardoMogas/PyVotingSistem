import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Chart } from '../components/Chart';
const jsonData = {
    "data": [
        {
            "nombre": "Rana Rene",
            "total": 4
        },
        {
            "nombre": "Andrés Manuel López Obrador",
            "total": 1
        },
        {
            "nombre": "Juanito Parra Nocorruptum",
            "total": 1
        }
    ],
    "message": "GET votes per candidate",
    "status": true
};
const GraphPage = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = import.meta.env.VITE_REACT_APP_BASE_API + '/votes_per_candidate';
            try {
                const response = await fetch(url);
                const result = await response.json();
                const data = result.data;
                setChartData(data);
                console.log('Data:', data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <br />
        <Container style={{ height: '100vh', width: '100vw' }}>
            <h1 style={{ textAlign: 'center', color: 'blue' }}>Pagina de resultados</h1>
            {chartData ? (
                <>
                    <Chart data={chartData} />
                </>
            ) : (
                <p style={{ textAlign: 'center' }}>Loading...</p>
            )}
        </Container>
        </>
    );
};

export default GraphPage;
