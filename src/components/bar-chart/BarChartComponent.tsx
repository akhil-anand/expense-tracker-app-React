import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const BarChartComponent = ({ graph_data, height = 400 }: any) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar'
      },
      xaxis: {
        categories: []
      }
    }, 
    series: [
      {
        name: 'Expenses',
        data: []
      }
    ]
  });

  useEffect(() => {
    if (graph_data) {
      setChartData({
        options: {
          ...chartData.options,
          xaxis: {
            categories: graph_data?.categories
          }
        },
        series: [
          {
            name: 'Expenses',
            data: graph_data?.values
          }
        ]
      });
    }
  }, [graph_data]);

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type='bar'
      height={height}
    />
  );
};

export default BarChartComponent;
