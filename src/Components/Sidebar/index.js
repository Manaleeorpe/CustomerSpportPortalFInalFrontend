import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

//Manager
const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#524545" backgroundColor="#e4e4e4" breakpoint={720}  >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Engineer</CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/login/EngineerDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table" style={{ color: '#524545' }}>Update Complaints</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/login/EngineerDashboard/postfaqs" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table" style={{ color: '#524545' }}>Post FAQ's</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/complaint-chart" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line" style={{ color: '#524545' }}>chart</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/AdminComplaintChart" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line" style={{ color: '#524545' }}>Admin Performance</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/updateAdmin" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user" style={{ color: '#524545' }}>Edit Profile</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink exact to="/login/EngineerDashboard/logout" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user" style={{ color: '#524545' }}>Logout</CDBSidebarMenuItem>
            </NavLink>
            
            
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            
            
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;