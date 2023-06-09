import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./barcharthistory.component.scss";
import CaptialOneAPIService from '../../services/capitalOne.services';

const captialOneAPIService = new CaptialOneAPIService();
const BarChartHistory = () => {
    const [data, setData] = useState([
        {
            month: 'feb',
            credit: 4000,
            debit: 2400
        },
        {
            month: 'mar',
            credit: 2500,
            debit: 1500
        },
        {
            month: 'apr',
            credit: 3000,
            debit: 500
        },
        {
            month: 'may',
            credit: 3800,
            debit: 123
        }]);

    useEffect(() => {
        // Fetch credit and debit data from API or local data source
        const fetchData = async () => {
            const response = await captialOneAPIService.getLastFourMonthData('/accounts/641f5f1978f6910a15f0e098/purchases');
            setData(response);
        };
        fetchData();
    }, []);

    var today = new Date();
    var month = today.toLocaleString('default', { month: 'long' });

    return (
        <div className="bar-chart-card">
            <div className="bar-chart-title-color">
                <div className="bar-chart-card-title">{month.substring(0, 3) + ' ' + today.getFullYear()} </div>
                <div className="bar-chart-card-sub-title">Cash Flow Summary</div>
            </div>
            <div className="progress-bar-container">
            <BarChart width={350} height={350} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tickFormatter={(value) => {
                    return value.substring(0, 3); // Display first 3 characters of the month name
                }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="credit" fill="#82ca9d" />
                <Bar dataKey="debit" fill="#f28b82" />
            </BarChart>
            </div>
        </div>
    );
};

export default BarChartHistory;