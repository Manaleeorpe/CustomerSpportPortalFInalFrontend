import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
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
  MDBInput,
} from 'mdb-react-ui-kit';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    const handleForgotPassword = async () => {
      const endpoint = 'http://localhost:8080/auth/customer/forgot-password';
  
      const formData = new FormData();
      formData.append('email', email); // Add email to form data
  
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData, // Use form data here
        });
  
        if (response.ok) {
          setSuccessMessage('Password reset instructions sent to your email.');
          navigate('/');
          
        } else {
          const errorResponse = await response.json();
          setErrorMessage(errorResponse.message);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };
  
  return (
    <div>
    <EngineerDashboardHeader /> {/* Use the imported component */}
    <MDBContainer className="my-5">
      <MDBRow className="g-0">
        {/* Photo Column */}
        <MDBCol md="6" style={{ marginTop: '50px' }}>
          <MDBCardImage
            src={Axisgirl}
            alt="login form"
            className="rounded-start w-100"
          />
        </MDBCol>


        <MDBCol md="6">
          <MDBCardBody className="custom-card-column">
          <div className='d-flex flex-row mt-2'>
            <img src="/img/Axis.jpeg" alt="Axis" style={{ width: '3rem', height: '3rem', marginRight: '0.75rem', color: '#98144d' }} />
            <span className="h1 fw-bold mb-0">Customer Support Portal</span>
          </div>
         
            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
              Forgot Password
            </h5>
            <MDBInput
              wrapperClass="mb-4"
              label="Email Address"
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBBtn
              className="mb-4 px-5"
              style={{ backgroundColor: '#98144d', width: "650px", marginTop: "20px" }}
              size="lg"
              onClick={handleForgotPassword}
            >
              Reset Password
            </MDBBtn>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            {errorMessage && (
                  <div className="alert alert-danger" 
                  role="alert"
                  style={{ backgroundColor: 'red', color: 'white' }}>
                    {errorMessage}
                  </div>
                )}
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </div>
);
}

export default ForgotPasswordPage;