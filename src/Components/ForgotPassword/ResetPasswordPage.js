import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';
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

function ResetPasswordPage() {
  const [tokenValid, setTokenValid] = useState(false);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryToken = new URLSearchParams(location.search).get('token');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Send a request to your backend to verify the token
    const verifyToken = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/customer/reset-password?token=${queryToken}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setTokenValid(true);
          setToken(queryToken); // Set the token value from URL
        } else {
          setTokenValid(false);
        }
      } catch (error) {
        console.error('Error occurred:', error);
        setTokenValid(false);
      }
    };

    if (queryToken) {
      verifyToken();
    } else {
      setTokenValid(false);
    }
  }, [queryToken]);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }
    if (password.length < 4) {
      setErrorMessage('Password must have at least 4 characters.');
      return;
    }else {
      setErrorMessage('');
    }

    try {
      const response = await fetch('http://localhost:8080/auth/customer/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        setResetSuccess(true);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false); // Hide success message after 3 seconds
          navigate('/login'); // Redirect to login page
        }, 3000);
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  if (!tokenValid) {
    return <div>Invalid token.</div>;
  }

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
                <div className='d-flex flex-row mt-2'>
                  <img src="/img/Axis.jpeg" alt="Axis" style={{ width: '3rem', height: '3rem', marginRight: '0.75rem', color: '#98144d' }} />
                  <span className="h1 fw-bold mb-0">Customer Support Portal</span>
                </div>
                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                  Reset Password
                </h5>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Token"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  value={token}
                  readOnly
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="New Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Confirm Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <MDBBtn
                  className="mb-4 px-5"
                  style={{ backgroundColor: '#98144d', width: "650px", marginTop: "20px" }}
                  size="lg"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </MDBBtn>
                {errorMessage && (
                  <div className="alert alert-danger" 
                  role="alert"
                  style={{ backgroundColor: 'red', color: 'white' }}>
                    {errorMessage}
                  </div>
                )}
                {showSuccessMessage && (
                <div className="alert alert-success" role="alert">
                 Password reset successful! Redirecting to login page...
                </div>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ResetPasswordPage