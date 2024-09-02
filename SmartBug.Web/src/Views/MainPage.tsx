import { ReactNode, useState } from 'react'
import NavBar from '../Components/Menu/NavBar'
import SideBar from '../Components/Menu/SideBar'

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

const MainPage = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto p-4 md:p-3  overflow-x-hidden">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  )
}


  export default MainPage