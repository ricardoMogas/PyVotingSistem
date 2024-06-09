import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 200,
            },
        },
    },
};

export function Chart({ data }) {
    const labels = data.map(item => item.nombre);
    const chartData = data.map(item => item.total);

    const barChartData = {
        labels,
        datasets: [
            {
                label: 'Votes',
                data: chartData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return <Bar options={options} data={barChartData} />;
}
