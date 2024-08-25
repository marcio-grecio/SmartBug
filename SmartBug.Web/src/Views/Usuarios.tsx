import { errorLog } from '../Utils/Logger';
import Loading from '../Components/Loading';
import Alert from '../Components/Alert/Index';
import Input from '../Components/Input/Index';
import Button from '../Components/Button/Index';
import UsuarioForm from '../Components/Usuario/Index';
import { Settings2, Pencil, Plus } from 'lucide-react';
import { ThemeContext } from '../Contexts/ThemeContext';
import DataTable, { createTheme } from 'react-data-table-component';
import { getSelectedEmpreendimentoId } from '../Repository/AuthRepo';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { addUser, getAllUsers, getUser, UpdateUser } from '../Services/UserService';

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
  const [searchTerm, setSearchTerm] = useState('');
  const { colorMode } = useContext(ThemeContext) || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const enterpriseSelectedId = parseInt(getSelectedEmpreendimentoId());
  const [alert, setAlert] = useState<null | { type: 'error' | 'success' | 'warning', title: string, message: string }>(null);
  const [formData, setFormData] = useState({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    avatar: '',
    perfil: 0,
    ocupacao: '',
    isActive: true,
    empreendimentos: [] as string[],
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = async (id: any) => {
    try {
      const user = await getUser(id);

      setFormData({
        id: user.id, // Adiciona o ID ao formData para identificar que é uma edição
        nome: user.nome || '',
        email: user.email || '',
        senha: '',
        avatar: user.avatar || '',
        perfil: user.perfil || 0,
        ocupacao: user.ocupacao || '',
        isActive: user.isActive === 'Active', 
        empreendimentos: user.empreendimentos.map((id: number) => id.toString()), 
      });

      setIsModalOpen(true); 

    } catch (error) {
      errorLog('Erro ao carregar usuário:', error);
      setAlert({
        type: 'error',
        title: 'Erro',
        message: 'Erro ao carregar os dados do usuário. Por favor, tente novamente.',
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
      name: <div style={{ textAlign: 'left', width: '100%' }}>NOME DO USUÁRIO</div>,
      selector: (row: any) => row.nome,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.nome}</div>,
    },
    {
      name: <div style={{ textAlign: 'left', width: '100%' }}>OCUPAÇÃO</div>,
      selector: (row: any) => row.ocupacao,
      sortable: true,
      cell: (row: any) => <div style={{ textAlign: 'left', width: '100%' }}>{row.ocupacao}</div>,
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
          <button onClick={() => handleButtonClick(row.id)}>
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
        setFilteredUsers(formatterData);
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
        id: 0,
        nome: '',
        email: '',
        senha: '',
        perfil: 0,
        avatar: '',
        ocupacao: '',
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


  const handleSubmit = async () => {
    try {
      const serviceFunction = formData.id ? UpdateUser : addUser;
      const { status, data } = await serviceFunction(formData);

      if (status === 200) {
        setAlert({
          type: 'success',
          title: 'Sucesso',
          message: data.message,
        });
        toggleModal();
        getUsersData();
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
        message: 'Erro ao salvar usuário. Por favor, tente novamente.',
      });
    }
  };

  useEffect(() => {
    const results = users.filter((user) =>
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.ocupacao.toLowerCase().includes(searchTerm.toLowerCase()) // Adapte os campos conforme necessário
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  useEffect(() => {
    getUsersData();
  }, [getUsersData]);

  return (
    <section
      className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      style={{ height: 'calc(89vh - 3px)' }}
    >
      {loading && <Loading fullscreen text="Carregando usuários..." />}
      {!loading && (
        <>
          <div className="border-b border-stroke dark:bg-boxdark bg-bodyWhite dark:border-strokedark">
            <div className="row" style={{ marginTop: 0 }}>
              <div className="col-md-9 mb-5 mt-3">
                <div className="ml-4 mb-3">
                  <Button color='#28C76F' text='Novo Usuário' onClick={toggleModal} disabled={false} height={32} width={140} fontWeight={'600'} fontFamily='nunito' icon={Plus} />
                </div>
              </div>

              <div className="col-md-3 mb-5 mt-3">
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
                data={filteredUsers}
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
          // title={alert.title}
          position="top-right"
          showProgress={true}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
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
