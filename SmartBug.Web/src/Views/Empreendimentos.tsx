import { errorLog } from '../Utils/Logger';
import Loading from '../Components/Loading';
import Input from '../Components/Input/Index';
import Alert from '../Components/Alert/Index';
import Button from '../Components/Button/Index';
import { Settings2, Pencil, Plus } from 'lucide-react';
import { ThemeContext } from '../Contexts/ThemeContext';
import DataTable, { createTheme } from 'react-data-table-component';
import EmpreendimentoForm  from '../Components/Empreendimento/Index';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { addEmpreendimento, getAllEmpreendimentos, getEmpreendimento, UpdateEmpreendimento } from '../Services/EmpreendimentoService';

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

const Empreendimentos: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [empreendimentos, setEmpreendimentos] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { colorMode } = useContext(ThemeContext) || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredEmpreendimentos, setFilteredEmpreendimentos] = useState<any[]>([]);
  const [alert, setAlert] = useState<null | { type: 'error' | 'success' | 'warning', title: string, message: string }>(null);
  const [formData, setFormData] = useState({
    id: 0,
    cor: '',
    nome: '',
    localidade:'',
    construtora:'',
    unidadesTotal:0,
    unidadesDisponiveis:0,
    usuarios: [] as string[],
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = async (id: any) => {
    try {
      const empreendimentoData = await getEmpreendimento(id);
  
      setFormData({
        id: empreendimentoData.id, 
        cor: empreendimentoData.cor || '',
        nome: empreendimentoData.nome || '',
        localidade:empreendimentoData.localidade || '',
        construtora:empreendimentoData.construtora || '',
        unidadesTotal:empreendimentoData.unidadesTotal || 0,
        unidadesDisponiveis:empreendimentoData.unidadesDisponiveis || 0,
        usuarios: empreendimentoData.usuarios.map((id: number) => id.toString()), 
      });
  
      setIsModalOpen(true);
  
    } catch (error) {
      errorLog('Erro ao carregar empreendimento:', error);
      setAlert({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao carregar os dados do empreendimento. Por favor, tente novamente.',
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
      name: <div style={{ textAlign: 'left', width: '100%' }}>NOME DO EMPREENDIMENTO</div>,
      selector: (row: any) => row.nome,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.nome}</div>,
    },
    {
      name: <div style={{ textAlign: 'left', width: '100%' }}>NOME DA CONSTRUTORA</div>,
      selector: (row: any) => row.construtora,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.construtora}</div>,
    },
    {
      name: <div style={{ textAlign: 'left', width: '100%' }}>LOCALIDADE</div>,
      selector: (row: any) => row.localidade,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.localidade}</div>,
    },
    {
      name: <div style={{ textAlign: 'center', width: '100%' }}>TOTAL DE UNIDADES</div>,
      selector: (row: any) => row.unidadesDisponiveis,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'center', width: '100%' }}>{row.unidadesTotal}</div>,
    },
    {
      name: <div style={{ textAlign: 'center', width: '100%' }}>UNIDADES DISPONÍVEIS</div>,
      selector: (row: any) => row.unidadesTotal,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'center', width: '100%' }}>{row.unidadesDisponiveis}</div>,
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

  const getEmpreendimentoData = useCallback(async () => {
    try {
      const response = await getAllEmpreendimentos();
      if (response.status === 200) {
        const formatterData = response.data.map((s: any) => {
          s.key = Math.random() + Date.now();
          return s;
        });
        setEmpreendimentos(formatterData);
        setFilteredEmpreendimentos(formatterData);
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
        cor: '',
        nome: '',
        localidade:'',
        construtora:'',
        unidadesTotal:0,
        unidadesDisponiveis:0,
        usuarios: [],
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
      const serviceFunction = formData.id ? UpdateEmpreendimento : addEmpreendimento;
      const { status, data } = await serviceFunction(formData);

      if (status === 200) {
        setAlert({
          type: 'success',
          title: 'Sucesso',
          message: data.message,
        });
        toggleModal();
        getEmpreendimentoData();
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
        message: 'Erro ao salvar empreendimento. Por favor, tente novamente.',
      });
    }
  };

  useEffect(() => {
    const results = empreendimentos.filter((empreendimento) =>
      empreendimento.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empreendimento.localidade.toLowerCase().includes(searchTerm.toLowerCase()) || 
      empreendimento.construtora.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredEmpreendimentos(results);
  }, [searchTerm, empreendimentos]);

  useEffect(() => {
    getEmpreendimentoData();
  }, [getEmpreendimentoData]);

  return (
    <section
      className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      style={{ height: 'calc(89vh - 3px)' }}>
      {loading && <Loading fullscreen text="Carregando Empreendimentos..." />}
      {!loading && (
        <>
          <div className="border-b border-stroke dark:bg-boxdark bg-bodyWhite dark:border-strokedark">
            <div className="row" style={{ marginTop: 0 }}>
              <div className="col-md-9 mb-2 mt-3">
                <div className="ml-4 mb-3">
                  <Button color='#28C76F' text='Novo Empreendimento' onClick={toggleModal} disabled={false} height={32} width={200} fontWeight={'600'} fontFamily='nunito' icon={Plus} />
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
                data={filteredEmpreendimentos}
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
          <EmpreendimentoForm
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

export default Empreendimentos;
