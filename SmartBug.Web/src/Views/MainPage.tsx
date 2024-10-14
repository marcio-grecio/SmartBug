import { errorLog } from '../Utils/Logger';
import NavBar from '../Components/Menu/NavBar';
import SideBar from '../Components/Menu/SideBar';
import { HubConnection } from '@microsoft/signalr';
import { UserContext } from '../Contexts/UserContext';
import React, { ReactNode, useState, useEffect, useContext } from 'react';
import { configureHub, serverConnectionService } from '../Services/SignalRService';


type MainPageProps = {
  children: ReactNode;
};

const MainPage = ({ children }: MainPageProps) => {
  const { activeUser } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>('offline');
  const [closedConnection, setClosedConnection] = useState<boolean>(false);
  const [connectionState, setConnectionState] = useState<string>('Disconnected');
  
  useEffect(() => {
    if (!activeUser) {
      return;
    }
  
    if(activeUser) {
    const newConnection = configureHub(handleUserConnectionStatus, handleUserConnectionClose);
    if (newConnection) {
      setConnection(newConnection);
      serverConnectionService(newConnection).then((statusCode) => {
        if (statusCode === 200) {
          setConnectionState('Connected');
          // Conectar e configurar os serviços e eventos quando a conexão for bem-sucedida
   
          // Adicione outros eventos conforme necessário...
        } else {
          setClosedConnection(true);
        }
      }).catch((error) => {
        errorLog(error);
      });
    }
    return () => {
      newConnection?.stop();
    };
  }
  }, [activeUser]); 
  
  
  const handleUserConnectionStatus = (status: string, _: boolean, __: boolean, ___: string, ____: boolean, level: string) => {
    setCurrentStatus(status);
    console.log(`Status: ${status}, Level: ${level}`);
  };

  const handleUserConnectionClose = (message: string) => {
    console.log(`Connection closed: ${message}`);
    setClosedConnection(true);
  };

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-hidden">
          <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto p-4 md:p-3 overflow-x-hidden">
              {React.cloneElement(children as React.ReactElement, {
                currentStatus,
                closedConnection,
                connection,
                connectionState,
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainPage;


// useEffect(() => {
//     // if (activeUser) {
//     //   ; (async () => {
//     //     const integrations = await getAllIntegrations(enterpriseSelectedId)
//     //     if (!!integrations) {
//     //       saveIntegrationsEnterprise(integrations);
//     //     }
//     //   })()
//     // }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
