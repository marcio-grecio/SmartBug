import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type LineData = {
  name: string;
  values: number[];
};

type LineProps = {
  data: LineData[];
  xAxisData: string[];
  theme?: 'light' | 'dark';
  colors?: string[];
};

const LineChart: React.FC<LineProps> = ({ data, xAxisData, theme = 'light', colors }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current, theme);

      const option = {
        title: {
          text: 'Gráfico de Linhas',
          left: 'center',
        },
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          top: 'bottom',
          
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: data.map((item) => ({
          name: item.name,
          type: 'line',
          data: item.values,
          smooth: true,
        })),
        color: colors, // Definindo o array de cores para as séries
      };

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [data, xAxisData, theme, colors]);

  return <div ref={chartRef} style={{ width: '100%', height: '370px' }} />;
};

export default LineChart;