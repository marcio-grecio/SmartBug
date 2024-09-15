import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Loading from "../Loading";
import Input from "../Input/Index";
import Button from "../Button/Index";
import { errorLog } from "../../Utils/Logger";
import InputDropDown from "../Input/InputDropDown";
import { UserContext } from "../../Contexts/UserContext";
import { ThemeContext } from "../../Contexts/ThemeContext";
import DataTable, { createTheme } from "react-data-table-component";
import { GetLeadsByEnterprise, GetSelectAllEmpreendimento } from "../../Services/ReportService";
import ExportXlsButton from "../Button/ExportXlsButton";

// Estilos personalizados para o DataTable
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
      backgroundColor: '#f5f5f5',
    },
  },
  headRow: {
    style: {
      color: '#223336',
      backgroundColor: '#f5f5f5',
    },
  },
  headCells: {
    style: {
      backgroundColor: '#f5f5f5',
      color: '#000',
      borderRight: '1px solid #e0e0e0',
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
    },
  },
  cells: {
    style: {},
  },
  rows: {
    style: {
      minHeight: '72px',
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
      fill: '#FFFFFF',
      '&:hover': {
        fill: '#FFFFFF',
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

const EmpreendimentoLeads = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { activeUser } = useContext(UserContext);
  const { colorMode } = useContext(ThemeContext) || {};
  const [dataFinal, setDataFinal] = useState<string>('');
  const [dataInicial, setDataInicial] = useState<string>('');
  const [empreendimentos, setEmpreendimentos] = useState<any[]>([]);
  const [selectedEmpreendimento, setSelectedEmpreendimento] = useState<string>('');

  const formatDate = (date: string) => {
    if (!date) return '';
    const newDate = new Date(date);
    const day = String(newDate.getUTCDate()).padStart(2, '0');
    const month = String(newDate.getUTCMonth() + 1).padStart(2, '0');
    const year = newDate.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const exportColumns: {
    header: string;
    key: string;
    width?: number;
    alignment?: 'left' | 'center' | 'right'; // Corrigido para usar tipos específicos
    sum?: boolean;
  }[] = [
      { header: 'CANAL DO LEAD', key: 'canal', width: 70, alignment: 'left' },
      { header: 'TOTAL', key: 'total', width: 22, alignment: 'center', sum: true },
      { header: 'QUALIFICADOS', key: 'qualificado', width: 22, alignment: 'center', sum: true },
      { header: 'DESCARTADOS', key: 'descartado', width: 22, alignment: 'center', sum: true }
    ];

  const columns = useMemo(() => [
    {
      name: <div style={{ textAlign: 'left', width: '100%' }}>CANAL</div>,
      selector: (row: any) => row.canal,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.canal}</div>,
    },
    {
      name: <div style={{ textAlign: 'center', width: '100%' }}>TOTAL DE LEADS</div>,
      selector: (row: any) => row.total,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'center', width: '100%' }}>{row.total}</div>,
    },
    {
      name: <div style={{ textAlign: 'center', width: '100%' }}>LEADS QUALIFICADOS</div>,
      selector: (row: any) => row.qualificado,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'center', width: '100%' }}>{row.qualificado}</div>,
    },
    {
      name: <div style={{ textAlign: 'center', width: '100%' }}>LEADS DESCARTADOS</div>,
      selector: (row: any) => row.descartado,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'center', width: '100%' }}>{row.descartado}</div>,
    },
  ], []);

  const getReportData = useCallback(async () => {
    try {
      const userId = Number(activeUser?.id) || 0;
      const response = await GetSelectAllEmpreendimento(userId);

      const getSelectEmpreendimento = response.map(({ id, nome }: { id: number, nome: string }) => ({
        label: nome,
        value: id.toString(),
      }));

      const allEmpreendimentosOption = { label: 'TODOS OS EMPREENDIMENTOS', value: '0' };
      const updatedEmpreendimentos = [allEmpreendimentosOption, ...getSelectEmpreendimento];

      setEmpreendimentos(updatedEmpreendimentos);
      setLoading(false);
    } catch (error) {
      errorLog(error);
      setLoading(false);
    }
  }, [activeUser]);

  const handleSelectChange = (e: any) => {
    setSelectedEmpreendimento(e.target.value);
    setLeads([]); // Limpa os dados de leads ao alterar o empreendimento selecionado
  };

  const handleSubmit = async () => {
    const leadData = await GetLeadsByEnterprise(dataInicial, dataFinal, Number(selectedEmpreendimento));
    setLeads(leadData);
  };

  useEffect(() => {
    getReportData();
  }, [getReportData]);

  const tableTitle = leads.length > 0 && (
    <div style={{ marginBottom: 10 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ margin: 0, fontFamily: 'nunito', fontWeight: 700 }}>RELATÓRIO DE LEADS POR EMPREENDIMENTO</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'nunito', fontWeight: 600 }}>
          <small>{formatDate(dataInicial)} à {formatDate(dataFinal)}</small>
        </div>
      </div>
      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '20px -20px -1px -20px' }} />
      <small style={{ fontWeight: '700', fontFamily: 'nunito', marginLeft: -10, fontSize: 12, marginTop: 100 }}>
        {selectedEmpreendimento ? `${empreendimentos.find(e => e.value === selectedEmpreendimento)?.label || ''}` : ''}
      </small>
    </div>
  );

  return (
    <section className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" style={{ height: 'calc(89vh - 3px)' }}>
      {loading && <Loading fullscreen text="Carregando Clientes com Propostas..." />}
      {!loading && (
        <>
          <div className="border-b border-stroke dark:bg-boxdark bg-bodyWhite dark:border-strokedark">
            <div className="row" style={{ marginTop: 0 }}>
              <div className="col-md-9 mb-2 mt-3">
                <div className="ml-4 mb-3">
                  <label style={{ fontFamily: 'nunito', fontSize: 14, fontWeight: '700' }}>RELATÓRIO DE LEADS POR EMPREENDIMENTO</label>
                </div>
              </div>
            </div>
          </div>
          <div className="mi-card">
            <div className="row border-b border-stroke dark:bg-boxdark bg-bodyWhite dark:border-strokedark">
              <div className="col-md-3"></div>
              <div className="col-md-3 mb-1 mt-1">
                <InputDropDown
                  label=""
                  name="empreendimentoId"
                  value={selectedEmpreendimento}
                  options={empreendimentos}
                  onChange={handleSelectChange}
                  multiple={false}
                  placeholder="Selecione um empreendimento"
                  required
                  autoFocus
                />
              </div>
              <div className="col-md-1 mt-1">
                <Input
                  type="date"
                  name="dataInicial"
                  value={dataInicial}
                  onChange={(e) => setDataInicial(e.target.value)}
                  style={{ fontFamily: 'nunito', fontSize: 14, fontWeight: '700' }}
                  required
                />
              </div>
              <div className="col-md-1 mt-1">
                <Input
                  type="date"
                  name="dataFinal"
                  value={dataFinal}
                  onChange={(e) => setDataFinal(e.target.value)}
                  style={{ fontFamily: 'nunito', fontSize: 14, fontWeight: '700' }}
                  required
                />
              </div>
              <div className="col-md-1 mt-1.5 mb-1.5">
                <Button
                  height={36}
                  width={130}
                  type="submit"
                  text='Filtrar'
                  color='#3f51b5'
                  disabled={false}
                  fontWeight={'600'}
                  fontFamily='nunito'
                  marginTop="-1px"
                  borderRadious="2px"
                  onClick={handleSubmit}
                />
              </div>
              <div className="col-md-1 mt-1.5 mb-1.5 -ml-6">
                {leads.length > 0 && (
                  <ExportXlsButton
                    height={36}
                    width={130}
                    text='Excel'
                    data={leads}
                    sumColspan={1}
                    color='#28C76F'
                    marginTop='-1px'
                    titleHeight={40}
                    fontWeight={'600'}
                    titleFontSize={16}
                    borderRadious='2px'
                    fontFamily='nunito'
                    headerFontSize={12}
                    subtitleHeight={20}
                    subtitleFontSize={12}
                    sumText="Total Geral"
                    columns={exportColumns}
                    sumTextColor="FFFFFFFF"
                    headerTextColor="FFFFFFFF"
                    sumBackgroundColor="9ac2e6"
                    titleBackgroundColor="4473c5"
                    headerBackgroundColor="9ac2e6"
                    subtitleBackgroundColor="8ea9de"
                    title="Relatório de Leads por Empreendimento"
                    fileName="Relatório de Leads por Empreendimento.xlsx"
                    subtitleRight={`Período: ${formatDate(dataInicial)} à ${formatDate(dataFinal)}`}
                    subtitleLeft={empreendimentos.find(e => e.value === selectedEmpreendimento)?.label || 'Todos os empreendimentos'}
                  />
                )}

              </div>
            </div>

            <div className="mi-card">
              <div className="col-md-12 mb-4">
                <DataTable
                  columns={columns}
                  data={leads}
                  fixedHeader
                  fixedHeaderScrollHeight="69vh"
                  striped
                  highlightOnHover
                  dense
                  theme={colorMode === 'dark' ? 'customDark' : 'customLight'}
                  responsive
                  title={tableTitle}
                  paginationPerPage={18}
                  pagination
                  paginationRowsPerPageOptions={[18, 40, 60, 80, 100]}
                  paginationComponentOptions={paginationComponentOptions}
                  customStyles={colorMode === 'dark' ? customDark : customLight}
                  className="dark:bg-boxdark-2 dark:text-bodydark"
                  noDataComponent="Não há registros para exibir"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default EmpreendimentoLeads;