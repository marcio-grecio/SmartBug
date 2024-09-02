import { format } from 'date-fns';
import { errorLog } from '../Utils/Logger';
import Loading from '../Components/Loading';
import Input from '../Components/Input/Index';
import Alert from '../Components/Alert/Index';
import Button from '../Components/Button/Index';
import LeadForm  from '../Components/Lead/Index';
import { Settings2, Pencil, Plus } from 'lucide-react';
import { ThemeContext } from '../Contexts/ThemeContext';
import DataTable, { createTheme } from 'react-data-table-component';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { addLead, getAllLeads, getLead, UpdateLead } from '../Services/DescartadoService';

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

const Leads: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { colorMode } = useContext(ThemeContext) || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [alert, setAlert] = useState<null | { type: 'error' | 'success' | 'warning', title: string, message: string }>(null);
  const [formData, setFormData] = useState({
    id: 0,
    canalId: 0,
    quantidade: 0,
    empreendimentoId: 0,
    dataLead: new Date(),
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = async (id: any) => {
    try {
      const leadData = await getLead(id);

      setFormData({
        id: leadData.id,
        canalId: leadData.canalId,
        dataLead: leadData.dataLead,
        quantidade: leadData.quantidade,
        empreendimentoId: leadData.empreendimentoId,
      });
  
      setIsModalOpen(true);
  
    } catch (error) {
      errorLog('Erro ao carregar lead:', error);
      setAlert({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao carregar os dados do lead. Por favor, tente novamente.',
      });
    }
  };

  const columns = useMemo(() => [
    {
      name: <div style={{ textAlign: 'left', width: '100%' }}>ID</div>,
      selector: (row: any) => row.id,
      sortable: true,
      width: '100px',
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.id}</div>,
    },
    {
      name: <div style={{ textAlign: 'left', width: '100%' }}>DATA</div>,
      selector: (row: any) => row.dataLead,
      sortable: true,
      width: '100px',
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.dataLead}</div>,
    },
    {
      name: <div style={{ textAlign: 'left', width: '100%' }}>CANAL DE LEAD</div>,
      selector: (row: any) => row.canal,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.canal}</div>,
    },
    {
      name: <div style={{ textAlign: 'center', width: '100%' }}>QUANTIDADE</div>,
      selector: (row: any) => row.quantidade,
      sortable: true,
      width: '150px',
      cell: (row: any) => <div style={{ textAlign: 'center', width: '100%' }}>{row.quantidade}</div>,
    },
    {
      name: <div style={{ textAlign: 'left', width: '100%' }}>EMPREENDIMENTO</div>,
      selector: (row: any) => row.empreendimento,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.empreendimento}</div>,
    },
    {
      name: <div style={{ textAlign: 'left', width: '100%' }}>CONSTRUTORA</div>,
      selector: (row: any) => row.construtora,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.construtora}</div>,
    },
    {
      name: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <span>
            <Settings2 size={22} />
          </span>
        </div>
      ),
      cell: (row: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <button onClick={() => handleButtonClick(row.id)}>
            <span><Pencil size={14} /></span>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      width: '200px',
    },
  ], []);

  const getLeadsData = useCallback(async () => {
    try {
      const response = await getAllLeads();
      if (response.status === 200) {
        const formatterData = response.data.map((s: any) => {
          s.key = Math.random() + Date.now();
          s.dataLead = format(s.dataLead, 'dd/MM/yyyy')
          return s;
        });
        setLeads(formatterData);
        setFilteredLeads(formatterData);
      }

      setLoading(false);
    } catch (error) {
      errorLog(error);
      setLoading(false);
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    if (!isModalOpen) {
      setFormData({
        id: 0,
        canalId: 0,
        quantidade: 0,
        empreendimentoId: 0,
        dataLead: new Date(),
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };


  const handleSubmit = async () => {
    try {
      const serviceFunction = formData.id ? UpdateLead : addLead;
      const { status, data } = await serviceFunction(formData);

      if (status === 200) {
        setAlert({
          type: 'success',
          title: 'Sucesso',
          message: data.message,
        });
        toggleModal();
        getLeadsData();
      }
      else if (status === 400) {
        setAlert({
          type: 'error',
          title: 'Erro',
          message: data.message,
        });
      }
      else if (status === 409) {
        setAlert({
          type: 'error',
          title: 'Erro',
          message: data.message,
        });
      }
      else {
        setAlert({
          type: 'warning',
          title: 'Atenção',
          message: data.message,
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao salvar lead. Por favor, tente novamente.',
      });
    }
  };

  useEffect(() => {
    const results = leads.filter((leadSearch) =>
      leadSearch.canal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leadSearch.quantidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leadSearch.construtora.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leadSearch.empreendimento.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeads(results);
  }, [searchTerm, leads]);

  useEffect(() => {
    getLeadsData();
  }, [getLeadsData]);

  return (
    <section
      className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      style={{ height: 'calc(89vh - 3px)' }}>
      {loading && <Loading fullscreen text="Carregando Leads Descartados..." />}
      {!loading && (
        <>
          <div className="border-b border-stroke dark:bg-boxdark bg-bodyWhite dark:border-strokedark">
            <div className="row" style={{ marginTop: 0 }}>
              <div className="col-md-9 mb-2 mt-3">
                <div className="ml-4 mb-3">
                  <Button color='#28C76F' text='Novo Lead' onClick={toggleModal} disabled={false} height={32} width={120} fontWeight={'600'} fontFamily='nunito' icon={Plus} />
                </div>
              </div>

              <div className="col-md-3 mb-2 mt-3">
                <div className="mr-4">
                  <Input type="text" placeholder="Pesquisar" value={searchTerm} onChange={handleSearchChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="mi-card mt-4">
            <div className="col-md-12 mb-4">
              <DataTable
                columns={columns}
                data={filteredLeads}
                fixedHeader
                fixedHeaderScrollHeight="69vh"
                striped
                highlightOnHover
                dense
                theme={colorMode === 'dark' ? 'customDark' : 'customLight'}
                responsive
                title=""
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
        </>
      )}
      {alert && (
        <Alert
          width='400px'
          duration={2000}
          type={alert.type}
          position="top-right"
          showProgress={true}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <LeadForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            toggleModal={toggleModal}
          />
        </div>
      )}
    </section>
  );
};

export default Leads;
