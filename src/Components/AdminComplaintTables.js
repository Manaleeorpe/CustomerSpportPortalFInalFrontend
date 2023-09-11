import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Mui from '@mui/material';

import {
  Card,
  CardBody,
  CardTitle,
  Table,
  InputGroup,
  InputGroupText,
  Input,
} from "reactstrap";
import './ViewComplaints/ComplaintTables.css';

function AdminComplaintTables() {
  const [complaints, setComplaints] = useState([]);
  const adminid = localStorage.getItem('adminid');
  const [statusMessage, setStatusMessage] = useState("");
  const customerid = localStorage.getItem('customerid');
  const [rating, setRating] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");
  const currentDate = new Date();
  

  useEffect(() => {
    fetchAdminComplaints(); 
  }, []);

  const fetchAdminComplaints = async (adminId) => {
    try {
      const response = await fetch(`http://localhost:8080/auth/admin/admin-complaints/${adminid}`, {
        credentials: 'include',
      });
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredComplaints = complaints.filter((complaint) =>
    complaint.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div>
    <Card className="custom-card" style={{ marginLeft: '80px',marginTop: '20px' ,marginRight:'80px' }}>
        <CardBody>
          <h1 className="mb-4" style={{ color: "#ac2358" }}>
            Complaint History
          </h1>
          <div className="search-bar" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search Complaints by status"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                width: "100%",
                padding: "10px 30px 10px 10px",
                fontSize: "16px",
              }}
            />
          </div>
          <Table className="custom-table no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Complaint Id</th>
                <th>Description</th>
                <th>Complaint Type</th>
                <th>Customer ID</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Complaint Posted On</th>
                <th>Complaint Resolved On</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.complaintId}>
                  <td>{complaint.complaintId}</td>
                  <td>{complaint.description}</td>
                  <td>{complaint.complaintType}</td>
                  <td>{complaint.customerId}</td>
                  <td> 
                    <Mui.Typography component="legend" style={{ fontSize: 'small' }}>Rating</Mui.Typography>
                    <Mui.Rating name="read-only" value={complaint.rating} readOnly style={{ fontSize: 'small' }} />
                 </td>
                  <td>
                  {complaint.status === "Pending" &&
                        <button
                          className="btn btn-warning mr-2"
                        >
                          Pending
                        </button>
                        }

                {complaint.status === "Cancelled" &&
                    <button
                    className="btn btn-danger mr-2"
                    >
                    Cancelled
                    </button>
                    }
                {complaint.status === "Resolved" &&
                    <button
                    className="btn btn-success mr-2"
                    >
                    Resolved
                    </button>
                    }
                {complaint.status === "In Progress" &&
                    <button style={{backgroundColor: '#1167b1' , color: 'white', fontSize: '16px' }} className="btn btn mr-2">Progress</button>
                    }
                  </td>
                  
                  <td>{new Date(complaint.StartDate).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                  <td>
                    {complaint.EndDate ? (
                      new Date(complaint.EndDate).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                    ) : (
                      '-'
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
    </div>
    </div>
  );
}

export default AdminComplaintTables;