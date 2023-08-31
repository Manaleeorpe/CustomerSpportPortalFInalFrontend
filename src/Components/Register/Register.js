import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../TokenContext";
import EngineerDashboardHeader from '../Header/EngineerDasboardHeader';
import Axisgirl from "../../assets/images/bg/axis girl.png";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';


function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [adminid, setAdmin] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); // New state variable for success message
    const [failMessage, setFailMessage ] = useState("");

    const handleRegister = async () => {
      let endpoint = "http://localhost:8080/auth/customer/signup"; // Default endpoint
  
      const registerData = { username, email, phone_number, password};
      if (username === '') {
        setFailMessage('Username cannot be empty.');
        return;
      }
  
      if (!email.includes('@')) {
        setFailMessage('Invalid email address.');
        return;
      }
  
      if (phone_number.length !== 10 || !/^\d+$/.test(phone_number)) {
        setFailMessage('Phone number should be a 10-digit number.');
        return;
      }
  
      if (password === '') {
        setFailMessage('Password cannot be empty.');
        return;
      }
      setFailMessage('');

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        });
  
        if (response.ok) {
          setSuccessMessage("Registeration successful"); // Set the success message
            setTimeout(() => {
              setSuccessMessage(""); // Hide the success message after 3 seconds
              navigate("/login");
            }, 1000);
          // You can redirect the user to a login page or perform any other actions here
          
        } else {
          const errorResponse = await response.json(); // Parse error response
          setFailMessage(errorResponse.message); // Set the error message
          setTimeout(() => setFailMessage(""), 2000)
        }
      } catch (error) {
        document.write(`Error occurred: ${error}`);
      }
    };

    return (
      <div>
        <EngineerDashboardHeader />
        <MDBContainer className="my-5">
          <MDBRow className="g-0">
            <MDBCol md="6" style={{ marginTop: '50px' }}>
              <MDBCardImage
                src={Axisgirl}
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>
            <MDBCol md="6">
              <MDBCard className="custom-card-column">
                <MDBCardBody>
                  <div className="d-flex flex-row mt-2">
                    <img
                      src="/img/Axis.jpeg"
                      alt="Axis"
                      style={{
                        width: '3rem',
                        height: '3rem',
                        marginRight: '0.75rem',
                        color: '#98144d',
                      }}
                    />
                    <span className="h1 fw-bold mb-0">
                      Customer Support Portal
                    </span>
                  </div>
                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: '1px' }}
                  >
                    Sign into your account
                  </h5>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Username"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email Address"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Phone Number"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={phone_number}
                    onChange={(e) => {
                      setPhone_number(e.target.value);
                    }}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <MDBBtn
                    className="mb-4 px-5"
                    style={{ backgroundColor: '#98144d', width: "650px", marginTop: "20px" }}
                    size="lg"
                    onClick={handleRegister}
                  >
                    Register
                  </MDBBtn>
                  <div>
                    {failMessage && (
                      <div
                        className="alert alert-fail"
                        role="alert"
                        style={{ backgroundColor: 'red', color: 'white' }}
                      >
                        {failMessage}
                      </div>
                    )}
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
    
}

export default Register;