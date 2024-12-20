import Loading from '../Components/Loading';
import PieChart from '../Components/Chart/Pie';
import RateBar from '../Components/Chart/RateBar';
import { errorLog, infoLog } from '../Utils/Logger';
import { ThemeContext } from '../Contexts/ThemeContext';
import StackedLineChart from '../Components/Chart/StackedLine';
import DataTable, { createTheme } from 'react-data-table-component';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getAllCanaisDashboard, getAllLeadsDashboard, getAllLeadsMensalDashboard, getAllVendasDashboard } from '../Services/DashboardService';


const customLight = {
  table: {
    style: {
      color: '#000',
      backgroundColor: '#fff',
    },
  },
  header: {
    style: {
      color: '#000',
      backgroundColor: '#cb4b16', // Pintar o cabeçalho
    },
  },
  headRow: {
    style: {
      color: '#223336',
      backgroundColor: '#cb4b16',
    },
  },
  headCells: {
    style: {
      backgroundColor: '#f5f5f5',
      color: '#000',
      borderRight: '1px solid #e0e0e0',
      fontSize: '1.1rem',
      fontWeight: '700',
      fontFamily: 'nunito',
    },
  },
  rows: {
    style: {
      minHeight: '72px',
    },
    highlightOnHoverStyle: {
      backgroundColor: '#e0f7fa',
      color: '#000',
      borderBottomColor: '#fff',
      outline: '1px solid #fff',
    },
    stripedStyle: {
      backgroundColor: '#f9f9f9',
      color: '#000',
    },
  },
  pagination: {
    style: {
      borderColor: '#e0e0e0',
      color: '#000',
    },
    pageButtonsStyle: {
      fill: '#000',
      '&:hover': {
        fill: '#2aa198',
      },
    },
  },
};

const customDark = {
  text: {
    primary: '#fff',
    secondary: '#2aa198',
  },
  background: {
    default: '#243040',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#2b3647',
  },
  action: {
    button: 'rgba(255,255,255,.54)',
    hover: 'rgba(255,255,255,.08)',
    disabled: 'rgba(255,255,255,.12)',
  },
  striped: {
    default: '#384152',
    text: '#fff',
  },
  headCells: {
    style: {
      backgroundColor: '#313d4b',
      color: '#fff',
      fontSize: '1.1rem',
      fontWeight: '700',
      fontFamily: 'nunito',
    },
  },
  cells: {
    style: {
      // borderRight: '1px solid #616161',
    },
  },
  rows: {
    style: {
      minHeight: '72px', // override the row height
    },
    highlightOnHoverStyle: {
      backgroundColor: '#323e4d',
      color: '#fff',
      borderBottomColor: '#fff',
      outline: '1px solid #fff',
    },
  },
  pagination: {
    style: {
      borderColor: '#616161',
      color: '#fff',
    },
    pageButtonsStyle: {
      fill: '#FFFFFF', // Cor dos ícones de paginação
      '&:hover': {
        fill: '#FFFFFF', // Cor dos ícones de paginação ao passar o mouse
      },
    },
  },
};

const paginationComponentOptions = {
  rowsPerPageText: '',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

createTheme('customLight', customLight);
createTheme('customDark', customDark);

const formatDataForChart = (apiData: any) => {
  const { data, xAxisData } = apiData;

  // Obtém o mês atual (indexado em 0, então adiciona 1)
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthString = currentMonth.toString().padStart(2, '0'); // Formata como 'MM'

  const formattedData = data.map((item: any) => {
    const values = Array(xAxisData.length).fill(0);

    item.values.forEach((v: any) => {
      const dayString = v.day.toString().padStart(2, '0') + '-' + currentMonthString; // Usa o mês correto
      const dayIndex = xAxisData.indexOf(dayString);
      if (dayIndex !== -1) {
        values[dayIndex] = v.quantity;
      }
    });

    return {
      name: item.name,
      values: values,
    };
  });

  return {
    data: formattedData,
    xAxisData: xAxisData,
  };
};


const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [canais, setCanais] = useState<any[]>([]);
  const { colorMode } = useContext(ThemeContext) || {};
  const [xAxisData, setXAxisData] = useState<string[]>([]);
  const [leadsMensal, setLeadsMensal] = useState<any[]>([]);
  const [vendasMensal, setVendasMensal] = useState<any[]>([]);

  const columns = useMemo(() => {
    if (leads.length === 0) return [];

    const empreendimentoColumn = {
      name: <div style={{ textAlign: 'left', width: '100%' }}>EMPREENDIMENTO</div>,
      selector: (row: any) => row.nome,
      style: {
        textAlign: 'left',
        fontSize: '1.2rem',
        fontWeight: '700',
        fontFamily: 'nunito',
      },
      cell: (row: any) => (
        <div style={{ display: 'flex', alignItems: 'center', textAlign: 'left', width: '100%' }}>
          <span className='mr-2 flex h-5 w-5 items-center justify-center rounded-lg -mt-1' style={{ backgroundColor: row.cor }}></span>
          <span>{row.nome}</span>
        </div>
      ),
    };

    // Cria as colunas para cada data centralizadas
    const dateColumns = leads[0].datas.map((date: string, index: number) => ({
      name: <div style={{ textAlign: 'center', width: '100%' }}>{date}</div>,
      selector: (row: any) => row.quantidades[index],
      width: '140px',
      cell: (row: any) => (
        <div style={{ textAlign: 'center', width: '100%' }}>
          {row.quantidades[index]}
        </div>
      ),
      style: {
        textAlign: 'center',
        fontSize: '1.2rem',
        fontWeight: '700',
        fontFamily: 'nunito',
      },
    }));

    return [empreendimentoColumn, ...dateColumns];
  }, [leads]);

  const getData = useCallback(async () => {
    try {
      const leadsDb = await getAllLeadsDashboard();
      if (leadsDb.status === 200) {
        const jsonData = leadsDb.data;
  
        // Verifica se jsonData está definido e tem as propriedades esperadas
        if (jsonData && jsonData.datas && jsonData.empreendimentos) {
          // Formatar os dados para a tabela
          const formattedData = jsonData.empreendimentos.map((emp: any) => ({
            cor: emp.cor,
            nome: emp.nome,
            quantidades: emp.quantidades,
            datas: jsonData.datas,
          }));
  
          setLeads(formattedData);
        } else {
          errorLog('Dados recebidos não estão no formato esperado.', jsonData);
        }
      }
  
      const canaisDb = await getAllCanaisDashboard();
      if (canaisDb.status === 200) {
        const jsonData = canaisDb.data;
        if (jsonData) {
          setCanais(jsonData);
        } else {
          errorLog('Dados recebidos não estão no formato esperado.', jsonData);
        }
      }
  
      const leadsMensalDb = await getAllLeadsMensalDashboard();
      if (leadsMensalDb.status === 200) {
        const jsonData = leadsMensalDb.data;
  infoLog(jsonData);
        if (jsonData) {
          infoLog(jsonData);
  
          // Formatar os dados da API para o gráfico
          const { data: formattedData, xAxisData: formattedXAxisData } = formatDataForChart(jsonData);
  
          setLeadsMensal(formattedData);
          setXAxisData(formattedXAxisData);
        } else {
          errorLog('Dados recebidos não estão no formato esperado.', jsonData);
        }
      }
  
      const VendasDb = await getAllVendasDashboard();
  
      if (VendasDb.status === 200) {
        const jsonData = VendasDb.data;
        if (jsonData) {
          setVendasMensal(jsonData);
        } else {
          errorLog('Dados recebidos não estão no formato esperado.', jsonData);
        }
      }
  
      setLoading(false);
    } catch (error) {
      errorLog(error);
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    getData(); // Executa a primeira busca de dados imediatamente.
  
    const intervalId = setInterval(() => {
      getData(); // Executa a função de busca de dados a cada 10 minutos.
    }, 10 * 60 * 1000); // 10 minutos em milissegundos
  
    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado.
  }, [getData]);
  

  return (
    <section
      className="w-full max-w-full rounded-sm"
      style={{ height: 'calc(91vh - 3px)', }}
    >
      {loading && <Loading fullscreen text="Carregando Dashboard..." />}
      {!loading && (
        <>
          <div className="row">
            <div className="col-md-9 mb-1 relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <DataTable
                columns={columns}
                data={leads}
                fixedHeader
                fixedHeaderScrollHeight="69vh"
                striped={false}
                highlightOnHover={false}
                dense
                theme={colorMode === 'dark' ? 'customDark' : 'customLight'}
                responsive
                title=""
                paginationPerPage={18}
                pagination={false}
                paginationRowsPerPageOptions={[18, 40, 60, 80, 100]}
                paginationComponentOptions={paginationComponentOptions}
                customStyles={colorMode === 'dark' ? customDark : customLight}
                noDataComponent="Não há registros para exibir"
              />
            </div>

            <div className="col-md-3 mb-1 relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1">
              <PieChart
              title='CANAIS DE LEADS'
              subtitle='Percentual de leads por canal'
                data={canais}
                theme={colorMode === 'dark' ? 'dark' : 'light'}
                colors={['#5370c6', '#db6a6f', '#d789bd', '#3c9f77']}
              />
            </div>

            <div className="col-md-12 mb-1 relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1">

              <StackedLineChart
                subtitle="MÊS ATUAL"
                showLegend={false}
                data={leadsMensal}
                xAxisData={xAxisData}
                title="META DE VENDAS"
                theme={colorMode === 'dark' ? 'dark' : 'light'}
              />
            </div>

            <div className="col-md-12 mb-1 relative rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-1">
              <RateBar
                align="center"
                data={vendasMensal}
                showLegend={false}
                direction="horizontal"
                title="META DE VENDAS"
                subtitle=""
              />
            </div>


          </div>
        </>
      )}
    </section>
  );


};

export default Dashboard;