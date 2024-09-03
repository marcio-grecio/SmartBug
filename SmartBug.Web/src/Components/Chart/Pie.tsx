import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type PieData = {
    name: string;
    value: number;
};

type PieProps = {
    data: PieData[];
    theme?: 'light' | 'dark';
    colors?: string[]; // Adicionando a propriedade de cores
    title?: string;
    subtitle?: string;
};

const PieChart: React.FC<PieProps> = ({ data, theme = 'light', colors, title, subtitle }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = echarts.init(chartRef.current, theme);

            const option = {
                title: {
                    text: title,
                    subtext: subtitle,
                    left: 'center',
                    textStyle: {
                        fontFamily: 'Nunito', // Define a fonte como Nunito
                        fontSize: 19, // Define o tamanho da fonte do título
                    },
                    subtextStyle: {
                        fontFamily: 'Nunito', // Define a fonte do subtítulo
                        fontSize: 14, // Define o tamanho da fonte do subtítulo
                    },
                },
                backgroundColor: 'transparent',
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    top: 'bottom'
                },
                series: [
                    {
                        name: 'Quantidade',
                        type: 'pie',
                        radius: '50%',
                        data: data.map((item) => ({
                            name: item.name,
                            value: item.value,
                        })),
                        label: {
                            show: true,
                            formatter: '{d}%'
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ],
                color: colors, // Definindo o array de cores para a série
            };

            chartInstance.setOption(option);

            return () => {
                chartInstance.dispose();
            };
        }
    }, [data, theme, colors]);

    return <div ref={chartRef} style={{ width: '100%', minHeight: '270px', height: '100%' }} />;
};

export default PieChart;
