import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Table, InputGroup, InputGroupText, Input } from "reactstrap";
import './ComplaintTables.css';
import * as Mui from '@mui/material';

function ComplaintTables() {
  const [complaints, setComplaints] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const customerid = localStorage.getItem('customerid');
  const [rating, setRating] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const currentDate = new Date();
  const [isCancelConfirmationOpen, setCancelConfirmationOpen] = useState(false);
  const [cancelComplaintId, setCancelComplaintId] = useState(null);
  
  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    // Filter FAQs based on search query
    
    const filtered = complaints.filter((complaint) =>
      complaint.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredComplaints(filtered);
  }, [searchQuery, complaints]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auth/customer/${customerid}`, {
        credentials: 'include',
      });
      const data = await response.json();
      setComplaints(data.complaints);
      setFilteredComplaints(data.complaints);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const formatEndDate = (dateString, complaintType) => {
    const options = { month: 'short', day: 'numeric'};
    let EndDate = new Date(dateString);

    if (complaintType === "Level 2") {
      EndDate.setDate(EndDate.getDate() + 1);
    } else if (complaintType === "Level 3") {
      EndDate.setDate(EndDate.getDate() + 2);
    }
  
    return EndDate.toLocaleDateString(undefined, options);
  };

  const formatStartDate = (dateString) => {
    const options = { month: 'short', day: 'numeric'};
    let StartDate = new Date(dateString);
    return StartDate.toLocaleDateString(undefined, options);
  };

  
  const handleRating = (event, newValue, complaintid) => {

    let endpoint = `http://localhost:8080/auth/customer/rate/${complaintid}`;
  
    fetch(endpoint, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: newValue.toString(),
    })
      .then((response) => {
        if (response.ok) {
          setStatusMessage(`Thank you for your feedback `);
          fetchComplaints();
        } else {
          alert("Complaint did not update");
        }
      });
  };

  const handleCancellationWithConfirmation = (complaintid) => {
    setCancelComplaintId(complaintid);
   setCancelConfirmationOpen(true);
  };



  const handleCancellation = (complaintid) => {

    let endpoint = `http://localhost:8080/auth/customer/${customerid}/cancel-complaint/${complaintid}`;
    
    fetch(endpoint, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setTimeout(() => {
            setStatusMessage("");
            setCancelConfirmationOpen(false); // Close the dialog
          }, 2000);
    
          setStatusMessage(`Complaint cancelled`);
          fetchComplaints();
        } else {
          alert("Complaint did not update");
        }
      });
  };

  return (
    <div >
      <Card className="custom-card" >
        <CardBody>
        <h1 className="mb-4" style={{ color: "#ac2358" }}>
              Previous Complaints
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
                  backgroundImage: `url('img/search.png')`, 
                  backgroundSize: "40px 40px", 
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                  
                }}
              />
            </div>
          <Table className="custom-table no-wrap mt-3 align-middle" responsive borderless>
            <thead >
              <tr>
                <th>Complaint Id</th>
                <th>Description</th>
                <th>Complaint Posted On</th>
                <th>Complaint To Be Resolved By</th>
                <th>Status</th>
                <th>Cancel</th>
                <th>rating</th>
                <th>Admin Comments</th>
                
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints && filteredComplaints.length > 0 ? (
                filteredComplaints
                  .map((complaint, index) => (
                    <tr key={index} className="border-top">
                        <td>{complaint.complaintid}</td>
                        <td>{complaint.description}</td>
                        <td>{formatStartDate(complaint.date)}</td>

                        <td>
                        {complaint.status === "Pending" || complaint.status === "In Progress"
                          ? formatEndDate(complaint.date, complaint.complaintType)
                          : "-"
                        }
                      </td>
                        <td>
                        {complaint.status === "Pending" && (
                          <button style={{ backgroundColor: 'yellow' }} className="btn btn-lg mr-2" >Pending</button>
                        )}
                        {complaint.status === "Cancelled" && (
                          <button className="btn btn-danger btn-lg mr-2">Cancelled</button>
                        )}
                        {complaint.status === "Resolved" && (
                          <button className="btn btn-success btn-lg mr-2">Resolved</button>
                        )}
                        {complaint.status === "In Progress" && (
                          <button style={{ backgroundColor: '#1167b1' , color: 'white', fontSize: '12px'}} className="btn btn-lg mr-2">In Progress</button>
                        )}

                      </td>
                      <td>
                        {(complaint.status === "Pending" || complaint.status === "In Progress") &&
                        <button
                          className="btn btn-success btn-lg mr-2"
                          onClick={() => handleCancellationWithConfirmation(complaint.complaintid)}
                        >
                          Cancel Complaint
                        </button>
                        }
                        </td>

                       

                      <td>
                      {complaint.status === "Resolved" && ( 
                      <>
                        <Mui.Typography component="legend">
                          {complaint.rating === null ? "No rating given" : `Rating: ${complaint.rating}`}
                        </Mui.Typography>
                        <Mui.Rating
                          precision={0.5}
                          size="large"
                          name={index} // Use a unique name for each complaint
                          value={complaint.rating} // Display the complaint's existing rating
                          onChange={(event, newValue) => handleRating(event, newValue, complaint.complaintid)}
                        />
                      </>
                    )
                   }
                   </td>
                   <td>
                   <td>
                      {complaint.status === "Resolved" && complaint.adminComments && (
                        complaint.adminComments
                      )}
                    </td>
                     
                    </td>

                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6">No complaints</td>
                </tr>
              )}
            </tbody>
          </Table>

        </CardBody>
      </Card>
      {statusMessage && (
            <div className="mt-3">
              <div className="alert alert-success" role="alert">
                {statusMessage}
              </div>
            </div>
          )}
          <Mui.Dialog
          open={isCancelConfirmationOpen}
          onClose={() => setCancelConfirmationOpen(false)}
        >
          <Mui.DialogTitle>Confirm Cancellation</Mui.DialogTitle>
         <Mui.DialogContent>
        <Mui.DialogContentText>
        Are you sure you want to cancel this complaint?
        </Mui.DialogContentText>
      </Mui.DialogContent>
       <Mui.DialogActions>
    <button
      className="btn btn-danger"
      onClick={() => handleCancellation(cancelComplaintId)}
    >
      Confirm
    </button>
    <button
      className="btn btn-secondary"
      onClick={() => setCancelConfirmationOpen(false)}
    >
      Cancel
    </button>
  </Mui.DialogActions>
</Mui.Dialog>

    </div>
  );
}

export default ComplaintTables;