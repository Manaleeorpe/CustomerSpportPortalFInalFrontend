import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import Sidebar from './Sidebar';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const chartContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 5rem)', // Adjust the height and subtract the Navbar height
  margin: '0 14rem', // Add margin to shift the chart a little to the right
  marginTop: '1rem',
  
};

const ComplaintChart = () => {
  const [complaintTypeCounts, setComplaintTypeCounts] = useState([]);
  const [chartType, setChartType] = useState('bar'); // Default chart type is bar

  useEffect(() => {
    const fetchComplaintTypeCounts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/auth/admin/complaint-type-counts',
          {
            withCredentials: true, // Include credentials
          }
        );
        const data = Object.entries(response.data).map(
          ([complaintType, count]) => ({
            complaintType,
            count,
          })
        );

        // Define your custom sorting order
        const customSortOrder = ['level 1', 'level 2', 'level 3'];

        // Sort the data based on the custom sorting order
        const sortedData = data.sort((a, b) =>
          customSortOrder.indexOf(a.complaintType.toLowerCase()) - customSortOrder.indexOf(b.complaintType.toLowerCase())
        );

        setComplaintTypeCounts(sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchComplaintTypeCounts();
  }, []);

  const barColor = '#98144d';
  const pieColors = ['#79103d', '#a22b5e', '#b65a82'];
  const lineColor = '#79103d';
  const toggleChartType = (newChartType) => {
    setChartType(newChartType);
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
          <h2>Complaint Type Counts Chart</h2>
          <div style={{ marginBottom: '30px' }}>
            <button onClick={() => toggleChartType('bar')}>Bar Chart</button>
            <button onClick={() => toggleChartType('pie')}>Pie Chart</button>
            <button onClick={() => toggleChartType('line')}>Line Chart</button>
          </div>
          {chartType === 'bar' ? (
            <BarChart width={740} height={480} data={complaintTypeCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="complaintType" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={barColor} />
            </BarChart>
          ) : chartType === 'pie' ? (
            <PieChart width={720} height={480}>
              <Tooltip />
              <Legend />
              <Pie
                data={complaintTypeCounts}
                dataKey="count"
                nameKey="complaintType"
                cx="50%"
                cy="50%"
                outerRadius={140}
                fill="#8884d8"
              >
                {complaintTypeCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
            </PieChart>
          ) : (
            <LineChart width={720} height={470} data={complaintTypeCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="complaintType" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone" // Use 'monotone' for smooth lines
                dataKey="count"
                name="Complaint Count"
                stroke={lineColor}
                activeDot={{ r: 8 }} // Customize the style of active dots
              />
            </LineChart>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintChart;