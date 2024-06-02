import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

const BarChartComponent = ({graph_data}:any) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: []
      }
    }, series: [
      {
        name: "Expenses",
        data: []
      }
    ]
  })

  useEffect(() => {
    if (chartData) {
      setChartData((prevState:any) => {
        return {
          options: {
            ...prevState?.options,
            xaxis: {
              categories: graph_data?.categories
            }
          },
            series: [
              {
                name: "Expenses",
                data: graph_data?.values
              }
            ]
          
        }
      })
    }
  }, [graph_data])

  return (
    <Chart
      options={chartData.options}
      series={chartData.series}
      type="bar"
      width="500"
    />
  )
}

export default BarChartComponent