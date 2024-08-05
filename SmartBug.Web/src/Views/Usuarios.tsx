import Input from '../Components/Input/Index';
import { errorLog, infoLog } from '../Utils/Logger';
import { getAllUsers } from '../Services/UserService';
import { ThemeContext } from '../Contexts/ThemeContext';
import { useCallback, useContext, useEffect, useState } from 'react';
import { getSelectedEmpreendimentoId } from '../Repository/AuthRepo';
import Button from '../Components/Button/Index';
import DataTable, { createTheme } from 'react-data-table-component';

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
      // borderRight: '1px solid #616161',
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

const columns = [
  {
    name: "ID",
    selector: (row: any) => row.personID,
    sortable: true,
  },
  {
    name: "Nome do Usuário",
    selector: (row: any) => row.fullName,
    sortable: true,
  },
  {
    name: "Height",
    selector: (row: any) => row.height,
    sortable: true,
  },
  {
    name: "Eye Color",
    selector: (row: any) => row.eyeColor,
    sortable: true,
  },
];

const rows = [
  {
    personID: 1,
    fullName: "Kate Shein",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 2,
    fullName: "Ava Roberts",
    height: "1.79m",
    eyeColor: "green",
  },
  {
    personID: 3,
    fullName: "Geoffrey Samson Lee",
    height: "1.79m",
    eyeColor: "brown",
  },
  {
    personID: 4,
    fullName: "Alex Smith",
    height: "1.79m",
    eyeColor: "brown",
  },
  {
    personID: 5,
    fullName: "Leila Nora Jones",
    height: "1.79m",
    eyeColor: "brown",
  },
  {
    personID: 6,
    fullName: "Harper Mitchell",
    height: "1.79m",
    eyeColor: "green",
  },
  {
    personID: 7,
    fullName: "Mason Cooper",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 8,
    fullName: "Hosea Noel Liam Wilson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 9,
    fullName: "Yvette Montgomery",
    height: "1.79m",
    eyeColor: "green",
  },
  {
    personID: 10,
    fullName: "Ethan Montgomery",
    height: "1.79m",
    eyeColor: "brown",
  },
  {
    personID: 11,
    fullName: "Olivia Parker",
    height: "1.79m",
    eyeColor: "brown",
  },
  {
    personID: 12,
    fullName: "Jackson Nguyen",
    height: "1.79m",
    eyeColor: "brown",
  },
  {
    personID: 13,
    fullName: "Sophia Ramirez",
    height: "1.79m",
    eyeColor: "brown",
  },
  {
    personID: 14,
    fullName: "Elijah Patel",
    height: "1.79m",
    eyeColor: "brown",
  },
  {
    personID: 15,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 15,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 16,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 17,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 18,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 19,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 20,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 21,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 22,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 23,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 24,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 25,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 26,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 27,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 28,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 29,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 30,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 31,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 32,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 33,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 34,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 35,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 36,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 37,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 38,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 39,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
  {
    personID: 40,
    fullName: "Isabella Thompson",
    height: "1.79m",
    eyeColor: "blue",
  },
];

const paginationComponentOptions = {
  rowsPerPageText: '',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

createTheme('customLight', customLight);
createTheme('customDark', customDark);

const Usuarios = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const enterpriseSelectedId = parseInt(getSelectedEmpreendimentoId())
  const { colorMode } = useContext(ThemeContext) || {};

  const getEnterprisesData = useCallback(async () => {
    try {
      const response = await getAllUsers(enterpriseSelectedId);

      if (!!response) {
        const formatterData = response.map((s: any) => {
          s.key = Math.random() + Date.now();

          infoLog('Usuarios->getEnterprisesData', s);

          return s;
        });
        setUsers(formatterData);
      }

      setLoading(false);
    } catch (error) {
      errorLog(error);
    }
  }, []);

  useEffect(() => {
    getEnterprisesData();
  }, [getEnterprisesData]);

  return (
    <section className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" style={{ height: 'calc(89vh - 3px)' }}>
      <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Lista de Usuários</h3>
      </div>
      <div className="mi-card px-5 mt-1">
        <div className="flex flex-wrap">
          <div className="flex-1 p-3 -ml-3 col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <Button color='#28C76F' text='Novo' onClick={() => infoLog('Olá')} disabled={false} height={32} width={120} fontWeight={'500'} />
          </div>
          <div className="flex-1 p-3 ml-3 col-xs-2 col-sm-2 col-md-2 col-lg-2">
            <Input type="text" placeholder="Pesquisar" />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={rows}
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
          // selectableRows
          paginationComponentOptions={paginationComponentOptions}
          customStyles={colorMode === 'dark' ? customDark : customLight}
          className="dark:bg-boxdark-2 dark:text-bodydark"
        />
      </div>
    </section>

  )
}

export default Usuarios;