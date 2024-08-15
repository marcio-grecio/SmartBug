import { errorLog } from '../Utils/Logger';
import Input from '../Components/Input/Index';
import Button from '../Components/Button/Index';
import { Settings2, Pencil } from 'lucide-react';
import UsuarioForm from '../Components/Usuario/Index';
import { getAllUsers } from '../Services/UserService';
import { ThemeContext } from '../Contexts/ThemeContext';
import DataTable, { createTheme } from 'react-data-table-component';
import { getSelectedEmpreendimentoId } from '../Repository/AuthRepo';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Loading from '../Components/Loading';

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

const Usuarios: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const { colorMode } = useContext(ThemeContext) || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const enterpriseSelectedId = parseInt(getSelectedEmpreendimentoId());
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    avatar: '',
    perfil: 0, // Default value as number
    isActive: true, // Default value as boolean
    empreendimentos: [] as string[], // Inicializa como array vazio de strings
  });
  

  const handleButtonClick = (id: any, actionType: any) => {
    console.log(`Clicked ID: ${id}, Action: ${actionType}`);
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
      name: <div style={{ textAlign: 'left', width: '100%' }}>NOME DO USUÁRIO</div>,
      selector: (row: any) => row.nome,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.nome}</div>,
    },
    {
      name: <div style={{ textAlign: 'left', width: '100%' }}>LOGIN DO USUÁRIO</div>,
      selector: (row: any) => row.email,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.email}</div>,
    },
    {
      name: <div style={{ textAlign: 'center', width: '100%' }}>SITUAÇÃO</div>,
      selector: (row: any) => row.isActive,
      sortable: true,
      width: '130px',
      cell: (row: any) => <div style={{ textAlign: 'center', width: '100%' }}>{row.isActive}</div>,
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
          <button onClick={() => handleButtonClick(row.id, 'action1')}>
            <span><Pencil size={14} /></span>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      width: '200px',
    },
  ], []);

  const getUsersData = useCallback(async () => {
    try {
      const response = await getAllUsers(enterpriseSelectedId);
      if (response.status === 200) {
        const formatterData = response.data.map((s: any) => {
          s.key = Math.random() + Date.now();
          s.isActive = s.isActive === 1 ? 'ATIVO' : 'INATIVO';
          return s;
        });
        setUsers(formatterData);
        console.log('Formatted Data:', formatterData);
      }else{

      }

      setLoading(false);
    } catch (error) {
      errorLog(error);
      setLoading(false);
    }
  }, [enterpriseSelectedId]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
    if (!isModalOpen) {
      setFormData({
        nome: '',
        email: '',
        senha: '',
        avatar: '',
        perfil: 0,
        isActive: true,
        empreendimentos: [],
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setFormData((prevFormData) => {
      if (name === 'perfil') {
        return { ...prevFormData, [name]: parseInt(value) };
      } else if (name === 'isActive') {
        return { ...prevFormData, [name]: value === 'true' };
      } else if (name === 'empreendimentos') {
        // Assegurar que 'empreendimentos' seja sempre um array de strings
        return { ...prevFormData, [name]: Array.isArray(value) ? value : [value] };
      } else {
        return { ...prevFormData, [name]: value };
      }
    });
  };
  
  

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    toggleModal(); // Fecha o modal após o envio
  };

  useEffect(() => {
    getUsersData();
  }, [getUsersData]);

  return (
    <section
      className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      style={{ height: 'calc(89vh - 3px)' }}
    >
      {loading && <Loading fullscreen text="Carregando usuários..." />}
      {!loading && users.length > 0 && (
        <>
          <div className="border-b border-stroke dark:bg-boxdark py-4 px-6.5 bg-bodyWhite dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Lista de Usuários</h3>
          </div>
          <div className="mi-card">
            <div className="row" style={{ marginTop: 10 }}>
              <div className="col-md-6 mb-4">
                <div className="ml-4 mb-3">
                  <Button color='#28C76F' text='Novo' onClick={toggleModal} disabled={false} height={32} width={120} fontWeight={'500'} />
                </div>
              </div>

              <div className="col-md-6 mb-5">
                <div className="mr-4">
                  <Input type="text" placeholder="Pesquisar" />
                </div>
              </div>
            </div>

            <div className="col-md-12 mb-4">
              <DataTable
                columns={columns}
                data={users}
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
              />
            </div>
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <UsuarioForm
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

export default Usuarios;
