import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import user2 from "../../assets/images/users/user2.jpeg";
import Sidebar from '../Sidebar'; 
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from 'mdb-react-ui-kit';

function UpdateAdmin() {
  const navigate = useNavigate();
  const adminid = localStorage.getItem('adminid');
  const [userProfileData, setUserProfileData] = useState({
    customerid: '',
    name: '',
    email: '',
    phone_number: '',
    // Other fields you want to display
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data using GET request
        const response = await fetch(`http://localhost:8080/auth/admin/${adminid}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const fetchedUserData = await response.json();
          console.log('Fetched user data:', fetchedUserData);
          // Filter out unwanted fields
          const filteredUserData = {
            customerid: fetchedUserData.adminid,
            name: fetchedUserData.name,
            email: fetchedUserData.email,
            phone_number: fetchedUserData.phone_number,
            // Other fields you want to display
          };
          setUserProfileData(filteredUserData);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [adminid]);

  const handleUpdateUserInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8080/auth/admin/update/${adminid}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfileData),
      });

      if (response.ok) {
        console.log('User details updated successfully!');
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateSuccess(false);
          navigate('/login/EngineerDashboard');
        }, 3000); // Clear success message after 3 seconds
      } else {
        console.error('Error updating user details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Navbar style={{ backgroundColor: "#98144d", position: "relative", marginTop: "-7px" }} expand="lg" variant="dark">
      <Link to="/" className="navbar-brand">
        <img
          src="/img/Axis Bank.png"
          width="150"
          height="45"
          className="d-inline-block align-top"
          alt="logo"
        />
      </Link>
      <Link to="/" style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            <FontAwesomeIcon icon={faHome} style={{ marginLeft: "1210px" }} />
          </Link>
      
    </Navbar>

    <div style={{ display: 'flex' }}>
      <Sidebar />
  
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f4f5f7' }}>
        <section className="vh-100">
          <MDBContainer className="py-5">
            <MDBRow className="justify-content-center">
              <MDBCol lg="8">
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem', backgroundColor: '#fff' }}>
                  <MDBRow className="g-0">
                    <MDBCol md="4" className="gradient-custom text-center text-white"style={{
                    borderTopLeftRadius: '.5rem',
                    borderBottomLeftRadius: '.5rem',
                    background: 'rgb(238,174,202)',
                    background: `radial-gradient(circle, rgba(238, 174, 202, 1) 0%, rgba(228, 228, 228, 1) 100%`

                    }}>
                      <MDBCardImage
                        src={user2}
                        alt="Avatar"
                        className="my-5"
                        style={{ width: '80px' }}
                        fluid
                      />
                      <MDBTypography tag="h5" className="text-dark">
                        {userProfileData.name}
                      </MDBTypography>
                      <MDBIcon far icon="edit mb-5" />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4">
                        <MDBTypography tag="h6">Information</MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <input
                          type="text"
                          value={userProfileData.name}
                          onChange={(e) => setUserProfileData({ ...userProfileData, name: e.target.value })}
                          className="form-control mb-3"
                        />
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <input
                          type="text"
                          value={userProfileData.email}
                          onChange={(e) => setUserProfileData({ ...userProfileData, email: e.target.value })}
                          className="form-control mb-3"
                        />
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <input
                          type="text"
                          value={userProfileData.phone_number}
                          onChange={(e) => setUserProfileData({ ...userProfileData, phone_number: e.target.value })}
                          className="form-control mb-4"
                        />
                        <button onClick={handleUpdateUserInfo} className="btn btn-primary">
                          Update
                        </button>
                        {updateSuccess && (
                          <div className="mt-3 alert alert-success" role="alert">
                            User details updated successfully!
                          </div>
                        )}
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
    </div>
    </div>
  );
 }  
export default UpdateAdmin;