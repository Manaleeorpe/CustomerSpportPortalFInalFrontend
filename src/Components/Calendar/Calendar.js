import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import * as Mui from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Sidebar from "../Sidebar";
import Navbar from 'react-bootstrap/Navbar';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Calendar.css';

import {
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";

function Calendar() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const adminid = localStorage.getItem('adminid');
  const currentDate = new Date();
  const calendarRef = useRef();

  useEffect(() => {
    fetchAdminComplaints();
  }, []);

  const fetchAdminComplaints = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auth/admin/admin-complaints/${adminid}`, {
        credentials: 'include',
      });
      const data = await response.json();
      // Filter complaints to include only "Pending" complaints
      const pendingComplaints = data.filter(complaint => complaint.status === "Pending" || complaint.status === "In Progress");
      setComplaints(pendingComplaints);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const events = complaints.flatMap((complaint) => {
    const start = new Date(complaint.StartDate);
    const end = complaint.status === "Resolved" ? new Date(complaint.EndDate) : null;
    let colorClass = '';

    if (complaint.complaintType === "Level 3") {
      colorClass = 'red';
      // For level 3 complaints, add an event that spans three days
      const nextDay = new Date(start);
      nextDay.setDate(start.getDate() + 2); // Increase by 2 days
  
      return [
        {
          title: `${complaint.complaintId}`,
          start: start,
          end: nextDay,
          className: ['translucent-event', colorClass], // Set the color for "Pending" complaints to red
          extendedProps: {
            complaintData: complaint,
          },
        },
      ];
    } else if (complaint.complaintType === "Level 2") {
      colorClass = 'purple';
      // For level 2 complaints, add an even that spans two days
      const nextDay = new Date(start);
      nextDay.setDate(start.getDate() + 1); // Increase by 1 day

      return [
        {
          title: `${complaint.complaintId}` ,
          start: start,
          end: nextDay,
          className: ['translucent-event', colorClass], // Set the color of pending complaints to purple
          extendedProps: {
            complaintData: complaint,
          },
        },
      ];
    } else if (complaint.complaintType === "Level 1") {
      colorClass = 'blue';
      // For level 1 complaints, add an even that spans one day
      const nextDay = new Date(start);
      nextDay.setDate(start.getDate()); // Same day

      return {
        title: `${complaint.complaintId}`,
        start: start,
        end: end,
        className: ['translucent-event', colorClass], // Set the color for "Pending" complaints to blue
        extendedProps: {
          complaintData: complaint,
        },
      };
    }
  });
  

  const handleEventClick = (info) => {
    const complaintData = info.event.extendedProps.complaintData;
    setSelectedComplaint(complaintData);
    toggleModal();
  };

  const eventRender = (info) => {
    const complaintsOnDate = events.filter(
      (event) => event.start.toDateString() === info.event.start.toDateString()
    );

    
    if (complaintsOnDate.length >= 1) {
      // Multiple complaints on this date, display IDs and descriptions one after the other
      const dotEl = document.createElement('div');
      dotEl.classList.add('green-dot');
      info.el.appendChild(dotEl);

      const containerEl = document.createElement('div');
      containerEl.classList.add('complaint-container');

      complaintsOnDate.forEach((complaint) => {
        const complaintInfoEl = document.createElement('p');
        complaintInfoEl.textContent = `Complaint #${complaint.title.split('#')[1]} - ${complaint.start.toDateString()}`;
        containerEl.appendChild(complaintInfoEl);
      });

      info.el.appendChild(containerEl);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
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
        <div>
        <Card className="custom-card" style={{ marginLeft: '80px', marginTop: '20px' ,marginRight: '80px'}}>
            <CardBody>
              <h1 className="mb-4" style={{ color: "#98144d" }}>
                Admin Complaints
              </h1>
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
                eventRender={eventRender}
                
                height="auto" // Set the calendar height to auto
                headerToolbar={{
                  left: "prev,next", // Remove both the "today" and "month" buttons
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                themeSystem="bootstrap" // Add this line to apply the Bootstrap theme
              />
              <Modal isOpen={modalOpen} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal} style={{ color: '#98144d' }}>Complaint Details</ModalHeader>
                <ModalBody>
                  {selectedComplaint && (
                    <div>
                      <h5>Complaint ID: {selectedComplaint.complaintId}</h5>
                      <p>Description: {selectedComplaint.description}</p>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                <Button style={{ backgroundColor: '#ac2358' }} onClick={toggleModal}>Close</Button>

                </ModalFooter>
              </Modal>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Calendar;