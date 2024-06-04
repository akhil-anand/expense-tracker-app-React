import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const PieChartComponent = ({ chartData, width }: any) => {
  const [options, setOptions] = useState<ApexOptions>({
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    legend: {
      position: 'bottom'
    }
  });

  const [series, setSeries] = useState<number[]>([]);

  useEffect(() => {
    if (chartData && chartData.categories && chartData.values) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        labels: chartData?.categories,
      }));
      setSeries(chartData?.values);
    }
  }, [chartData]);

  return (
    // <div></div>
    <Chart
      options={options}
      series={series}
      type="pie"
      width={width ?? "100%"}
      height={320}
    />
  );
};

export default PieChartComponent;
