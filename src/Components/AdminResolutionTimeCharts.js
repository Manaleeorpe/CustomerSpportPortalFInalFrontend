import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from 'react-bootstrap/Navbar';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import * as Mui from '@mui/material';

const chartContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 5rem)',
    margin: '0 18rem',
    marginTop: '1rem',
  };

const AdminResolutionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/admin/admin-resolution-time', {
          withCredentials: true, // Include credentials
        });
        const modifiedData = response.data.map((item, index) => ({
            ...item,
            adminid: `Admin ${index + 1}`,
            ResolvedPercentage: `Work Completed ${item.ResolvedPercentage}%`,
          }));  
          setData(modifiedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const resolvedPercentage = payload[0].payload.ResolvedPercentage;
      return (
        <div className="custom-tooltip">
          <p className="intro">{resolvedPercentage}</p>
        </div>
      );
    }

    return null;
  };

  
  return (
    <div>
      <Navbar
        style={{ backgroundColor: '#98144d', position: 'relative', marginTop: '-7px' }}
        expand="lg"
        variant="dark"
      >
        <Link to="/" className="navbar-brand">
          <img
            src="/img/Axis Bank.png"
            width="150"
            height="45"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Link>
        <Link
          to="/"
          style={{
            color: '#fff',
            textDecoration: 'none',
            transition: 'color 0.3s',
            fontSize: '16px',
          }}
        >
          <FontAwesomeIcon icon={faHome} style={{ marginLeft: '1210px' }} />
        </Link>
      </Navbar>
    <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={chartContainerStyle}>
          <h2>Admin Performance Overview</h2>

    <BarChart width={600} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="adminid" />
      <YAxis domain={[0, 'dataMax + 2']} >
        <Label value="Complaints" angle={-90} position="insideLeft" />
    </YAxis>  
    <Tooltip
        />
      <Legend />
      <Bar dataKey="Pending" fill="#FFA500" />
      <Bar dataKey="Resolved" fill="#008000" />
      <Bar dataKey="Cancelled" fill="#98144d" />


    </BarChart>
    </div>
    </div>
    </div>
  );
};

export default AdminResolutionChart;

