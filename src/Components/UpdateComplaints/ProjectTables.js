import React, { useState, useEffect, useMemo } from "react";
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpeg";
import user2 from "../../assets/images/users/user2.jpeg";
import user3 from "../../assets/images/users/user3.jpeg";
import user4 from "../../assets/images/users/user4.jpeg";
import user5 from "../../assets/images/users/user5.jpeg";

function ProjectTables() {
  const [complaints, setComplaints] = useState([]);
  const [adminComments, setAdminComments] = useState("");
  const adminid = localStorage.getItem('adminid');
  const [statusMessageInProgress, setStatusMessageInProgress] = useState("");
  const [statusMessageResolved, setStatusMessageResolved] = useState("");
  const [loadingComplaint, setLoadingComplaint] = useState(null);

  useEffect(() => {
    if (adminid) {
      fetchComplaints();
    } else {
      console.log('adminid is missing. Cannot fetch complaints.');
    }
  }, [adminid]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auth/admin/${adminid}`, {
        credentials: 'include',
      });
      const data = await response.json();
      setComplaints(data.complaints);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const randomUserImage = useMemo(() => {
    const users = [user1, user2, user3, user4, user5];
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  //To resolved
  const handleStatusUpdate = (complaintid, status) => {
    let endpoint = `http://localhost:8080/auth/admin/updateComplaint/${complaintid}`;

    const requestBody = {
      status: status,
      adminComments: adminComments
    };
    setLoadingComplaint(complaintid);

    fetch(endpoint, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          setStatusMessageResolved(`Success: Complaint ${complaintid} status is set to: ${status}`);
          fetchComplaints();

          setTimeout(() => {
            setStatusMessageResolved(null);
          }, 3000);
        } else {
          alert("Complaint did not update");
        }
        setLoadingComplaint(null);
      });
  };

  //To inprogress
  const handlePendingUpdate = (complaintid, status) => {
    let endpoint = `http://localhost:8080/auth/admin/Inprogress/${complaintid}`;

    const requestBody = {
      status: status,
    };
    setLoadingComplaint(complaintid);

    fetch(endpoint, {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          setStatusMessageInProgress(`Success: Complaint ${complaintid} status is set to: ${status}`);
          fetchComplaints();

          setTimeout(() => {
            setStatusMessageInProgress(null);
          }, 3000);
        } else {
          alert("Complaint did not update");
        }
        setLoadingComplaint(null);
      });
  };

  function getStatusTextColor(status) {
    switch (status) {
      case 'Pending':
        return 'rgba(255, 0, 0, 0.5)'; // Red color for 'Pending'
      case 'In Progress':
        return 'rgba(0, 0, 255, 0.5)'; // Blue color for 'In Progress'
      case 'Resolved':
        return 'rgba(128, 0, 128, 0.5)'; // Purple color for 'Resolved'
      case 'Cancelled':
        return 'rgba(102, 102, 102, 0.6)'; // Gray color for 'Cancelled'
      default:
        return 'inherit'; // Use the default text color
    }
  }
  

  return (
    <div>
      <Card className="custom-card" style={{ marginTop: '-20px' , width: '1200px' , margin: '0 auto' }}>
        <CardBody>
        <h1 className="mb-4" style={{ color: "#ac2358" }}>
            Update Complaint
          </h1>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Complaint Date</th>
                <th>Complaint Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Comments</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {complaints && complaints.length > 0 ? (
                complaints
                  .filter((complaint) => complaint.status === "Pending" || complaint.status === "In Progress")
                  .map((complaint, index) => (
                    <tr key={index} className="border-top">
                      <td>
                        <div className="d-flex align-items-center p-2">
                          <img
                            src={randomUserImage}
                            className="rounded-circle"
                            alt="avatar"
                            width="45"
                            height="45"
                          />
                          <div className="ms-3">
                            <span className="text-muted">{complaint.customerName}</span>
                          </div>
                        </div>
                      </td>
                      <td>{formatDate(complaint.date)}</td>
                      <td>{complaint.complaintType}</td>
                      <td>{complaint.description}</td>
                      <td>
                      <span style={{ fontWeight: 'bold', color: getStatusTextColor(complaint.status) }}>
                        {complaint.status}
                      </span>
                    </td>

                    <td>
                    {complaint.status === "In Progress" ? (
                      <input
                        className="form-control"
                        value={complaint.adminComments}
                        placeholder="Comments"
                        onChange={(e) => setAdminComments(e.target.value)}
                      />
                    ) : (
                      "-"
                    )}
                  </td>


                      <td>
                        {loadingComplaint === complaint.complaintid ? (
                          <div className="text-center">
                            <i className="fa fa-spinner fa-spin"></i> Please wait...
                          </div>
                        ) : (
                          (complaint.status === "Pending" && (
                            <button style={{ backgroundColor: '#1167b1' , color: 'white', fontSize: '12px'}} className="btn btn mr-2" onClick={() => handlePendingUpdate(complaint.complaintid, "In Progress")} >
                              In Progress
                            </button>
                          )) || (
                            (complaint.status === "In Progress" && (
                              <button style={{fontSize: '16px'}} className="btn btn-success mr-2" onClick={() => handleStatusUpdate(complaint.complaintid, "Resolved")} >
                                Resolved
                              </button>
                            ))
                          )
                        )}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6">No pending complaints available</td>
                </tr>
              )}
            </tbody>
          </Table>

        </CardBody>
      </Card>
      {statusMessageInProgress && (
        <div className="mt-3">
          <div
            className="alert alert-warning"
            role="warning"
            style={{ backgroundColor: 'orange' }}
          >
            {statusMessageInProgress}
          </div>
        </div>
      )}

      {statusMessageResolved && (
        <div className="mt-3">
          <div className="alert alert-success" role="alert">
            {statusMessageResolved}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectTables;
