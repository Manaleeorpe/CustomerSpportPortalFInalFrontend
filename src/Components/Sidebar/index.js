import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHistory,
  faCalendar,
  faMessage,
  faChartBar,
  faChartArea,
  faPencilAlt,
  faTh,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Create a CSS file (Sidebar.css) for styling

// Manager
const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#524545" backgroundColor="#e4e4e4" breakpoint={720}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Engineer</CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/login/EngineerDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faTh} className="sidebar-icon" />
                Update Complaints
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/login/EngineerDashboard/postfaqs" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faMessage} className="sidebar-icon" />
                Post FAQ's
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AdminCalender" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faCalendar} className="sidebar-icon" />
                Admin Calendar
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AdminComplaints" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faHistory} className="sidebar-icon" />
                Complaints History
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/complaint-chart" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faChartArea} className="sidebar-icon" />
                Level Overview
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AdminComplaintChart" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faChartBar} className="sidebar-icon" />
                Admin Performance
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/updateAdmin" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faPencilAlt} className="sidebar-icon" />
                Edit Profile
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/login/EngineerDashboard/logout" activeClassName="activeClicked">
              <CDBSidebarMenuItem className="sidebar-item">
                <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          ></div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;