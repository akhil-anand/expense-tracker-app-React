import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const BarChartComponent = ({ graph_data }: any) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar',
        responsive: [
          {
            breakpoint: 768,
            options: {
              chart: {
                width: '100%'
              },
              plotOptions: {
                bar: {
                  horizontal: false
                }
              },
              xaxis: {
                categories: []
              }
            }
          }
        ]
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
      setChartData((prevState: any) => ({
        options: {
          ...prevState.options,
          xaxis: {
            categories: graph_data.categories
          }
        },
        series: [
          {
            name: 'Expenses',
            data: graph_data.values
          }
        ]
      }));
    }
  }, [graph_data]);

  return (
    <div style={{ width: '100%' }}>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        width="100%"
      />
    </div>
  );
};

export default BarChartComponent;
