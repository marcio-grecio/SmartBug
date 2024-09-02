import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

// Tipos para os dados do gráfico
type StackedLineData = {
  name: string;
  values: number[];
};

type StackedLineProps = {
  data: StackedLineData[];
  xAxisData: string[];
  theme?: 'light' | 'dark';
  colors?: string[];
  showLegend?: boolean; // Propriedade para controlar a exibição da legenda
};

// Componente do gráfico de linhas empilhadas
const StackedLineChart: React.FC<StackedLineProps> = ({ data, xAxisData, theme = 'light', colors, showLegend = true }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current, theme);

      const option = {
        title: {
          text: 'LEADS POR EMPREENDIMENTO',
          subtext: 'leads do mês atual',
          left: 'center',
        },
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: showLegend ? { top: 'bottom' } : undefined, // Configuração da legenda
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
          data: item.values,
          smooth: true,
        })),
        color: colors,
      };

      chartInstance.setOption(option);

      return () => {
        chartInstance.dispose();
      };
    }
  }, [data, xAxisData, theme, colors, showLegend]);

  return <div ref={chartRef} style={{ width: '100%', height: '300px', margin: 0 }} />;
};

export default StackedLineChart;
