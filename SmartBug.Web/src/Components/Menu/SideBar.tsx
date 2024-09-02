import Logo from '../../Assets/images/logo/logo-white.webp';
// import Logo from '../../Assets/images/logo/logo.svg';
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from './SidebarLinkGroup';
import React from 'react';
import { 
  Users, 
  Filter, 
  Target, 
  FilterX, 
  Printer, 
  Building, 
  PieChart, 
  Handshake, 
  UsersRound, 
  ChevronDown, 
  TvMinimalPlay, 
  CircleDollarSign, 
} from 'lucide-react';


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}
const SideBar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        (sidebar.current.contains(target as Node) ||
          (trigger.current as HTMLElement).contains(target as Node))
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);


  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black dark:bg-boxdark duration-300 ease-linear ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >

      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" style={{ marginTop: -20 }} />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          style={{ marginTop: -16 }}
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill="#fff"
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="py-4 px-4 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">

              <li>
                <NavLink
                  to="/Leads"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Leads') && 'bg-graydark dark:bg-meta-4'}`}>
                  <Filter className="w-5 h-5" color='#1ab380'/>
                  Leads
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/Metas"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Metas') && 'bg-graydark dark:bg-meta-4'}`}>
                  <Target className="w-5 h-5" color='#f3aa5a' />
                  Metas
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/Usuarios"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Usuarios') && 'bg-graydark dark:bg-meta-4'}`}>
                  <Users className="w-5 h-5" color='#2c8ded'/>
                  Usuários
                </NavLink>
              </li>

              <SidebarLinkGroup activeCondition={ pathname === '/report' || pathname.includes('report')}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === '/report' || pathname.includes('report')) && 'bg-graydark dark:bg-meta-4'}`}
                        onClick={(e) => { e.preventDefault(); sidebarExpanded ? handleClick() : setSidebarExpanded(true); }}>
                        <Printer className="w-5 h-5" color='#25c6da'/>
                        Relatórios
                        <ChevronDown className={`absolute right-4 w-5 h-5 top-1/2 -translate-y-1/2 ${open && 'rotate-180'}`} />
                      </NavLink>
                      <div
                        className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/forms/form-elements"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }>
                              Form Elements
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }>
                              Form Layout
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <NavLink
                  to="/Clientes"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Clientes') && 'bg-graydark dark:bg-meta-4'}`}>
                  <UsersRound className="w-5 h-5" color='#e26cf6'/>
                  Clientes P4
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to="/Dashboard"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Dashboard') && 'bg-graydark dark:bg-meta-4'}`}>
                  <PieChart className="w-5 h-5" color='#3b50df'/>
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/Canais"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Canais') && 'bg-graydark dark:bg-meta-4'}`}>
                  <TvMinimalPlay className="w-5 h-5" color='#f98b97'/>
                  Canais de Lead
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/Vendas"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Vendas') && 'bg-graydark dark:bg-meta-4'}`}>
                  <CircleDollarSign className="w-5 h-5" color='#FFE985' />
                  Vendas Efetivadas
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/Descartados"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Descartados') && 'bg-graydark dark:bg-meta-4'}`}>
                  <FilterX className="w-5 h-5" color='#B3315F'/>
                  Leads Descartados
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/Empreendimentos"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Empreendimentos') && 'bg-graydark dark:bg-meta-4'}`}>
                  <Building className="w-5 h-5" color='#97ABFF'/>
                  Empreendimentos
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/Propostas"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('Propostas') && 'bg-graydark dark:bg-meta-4'}`}>
                  <Handshake className="w-5 h-5" color='#F05F57'/>
                  Clientes / Propostas
                </NavLink>
              </li>

            </ul>
          </div>
        </nav>
      </div>

    </aside>
  )
}

export default SideBar
