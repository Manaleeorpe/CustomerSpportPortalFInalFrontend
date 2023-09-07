import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import axios from 'axios';
import Sidebar from './Sidebar';
import Navbar from 'react-bootstrap/Navbar';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import * as Mui from '@mui/material';
import TopCards from './ComplaintTracker';
import ComplaintTracker from './ComplaintTracker';

const chartContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 5rem)',
    marginLeft: '20px',
    marginTop: '10px'
  };

const AdminComplaintChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/admin/admin-complaint-counts', {
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
          <h2 style={{ color: '#98144d' }}>Admin Performance Overview</h2>
          <ComplaintTracker />

    <BarChart width={900} height={450} data={data} >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="adminid" />
      <YAxis >
        <Label value="Complaints" angle={-90} position="insideLeft" />
    </YAxis>  
    <Tooltip
        content={(props) => (
            <div style={{
            border: '#bbb 1.5px solid',
            }}>
            <p style={{
            margin: '0 0',
            padding: '3px 7.5px',
            backgroundColor: 'white',
            }}>
            <Mui.Typography component="legend" style={{ fontSize: 'small' }}>Rating</Mui.Typography>
            <Mui.Rating name="read-only" value={props.payload && props.payload[0] != null && props.payload[0].payload.AverageRating} readOnly style={{ fontSize: 'small' }} />
            </p>
                
            <p style={{
                margin: '0 0',
                padding: '3px 7.5px',
                backgroundColor: 'white',
                color: "#F2789B"
            }}>
                Pending Complaints : {' '}
                {props.payload && props.payload[0] != null && props.payload[0].payload.Pending}
            </p>
            <p style={{
              margin: '0 0',
              padding: '3px 7.5px',
              backgroundColor: 'white',
              color: "#e63655"
            }}>
              In Progress Complaints :{' '}
              {props.payload && props.payload[0] != null ? props.payload[0].payload['In Progress'] : 'N/A'}
            </p>
            <p style={{
                margin: '0 0',
                padding: '3px 7.5px',
                backgroundColor: 'white',
                color: "#95070a"
            }}>
               Resolved Complaints : {' '}
                {props.payload && props.payload[0] != null && props.payload[0].payload.Resolved}
            </p>
            <p style={{
                margin: '0 0',
                padding: '3px 7.5px',
                backgroundColor: 'white',
                color: "#9a9681"
            }}>
                Cancelled Complaints : {' '}
                {props.payload && props.payload[0] != null && props.payload[0].payload.Cancelled}
            </p>
            <p style={{
                margin: '0 0',
                padding: '3px 7.5px',
                backgroundColor: 'white',
            }}>
                {props.payload && props.payload[0] != null && props.payload[0].payload.ResolvedPercentage}
            </p>
           
            </div>
        )}
        />
     
      <Bar dataKey="Pending" fill="#F2789B" />
      <Bar dataKey="In Progress" fill="#e63655" />
      <Bar dataKey="Resolved" fill="#9a9681" />
      <Bar dataKey="Cancelled" fill="#e92032" />
      <Legend />


    </BarChart>
    </div>
    </div>
    </div>
  );
};

export default AdminComplaintChart;

