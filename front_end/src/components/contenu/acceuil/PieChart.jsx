import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = () => {
  const series = [44, 55, 13, 43, 22];

  const options = {
    chart: {
      type: 'pie',
    },
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="pie" height={300} />
    </div>
  );
};

export default PieChart;
