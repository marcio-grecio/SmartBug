import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type AreaData = {
  name: string;
  values: number[];
};

type AreaProps = {
  data: AreaData[];
  xAxisData: string[];
  theme?: 'light' | 'dark';
  colors?: string[];
};

const StackedAreaChart: React.FC<AreaProps> = ({ data, xAxisData, theme = 'light', colors }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current, theme);

      const option = {
        title: {
          text: 'Gráfico de Área Empilhada',
          left: 'center',
        },
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
        },
        legend: {
          top: 'bottom',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: data.map((item) => ({
          name: item.name,
          type: 'line',
          stack: 'Total', // Empilha as áreas
          areaStyle: {},
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

  return <div ref={chartRef} style={{ width: '100%', height: '270px',  }} />;
};

export default StackedAreaChart;
