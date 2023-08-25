import React, { useState, useContext, useEffect } from 'react'; // Added 'useEffect'
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../TokenContext';

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

function LoginPage() {
  const navigate = useNavigate();
  const { setUserData } = useContext(TokenContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failMessage, setFailMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log('Effect triggered. Logged in:', loggedIn);

    if (loggedIn) {
      console.log('User is logged in:', loggedIn);
      const user = JSON.parse(localStorage.getItem('user')); // Assuming you're storing user data in localStorage
      console.log('User data:', user);

   if (user.roles[0] === 'ROLE_CUSTOMER') {

        localStorage.setItem("customerid", user.id);

        navigate('/');

        window.location.href = window.location.href;

      } else if (user.roles[0] === 'ROLE_ADMIN') {

        localStorage.setItem("adminid", user.id);

        navigate('/login/EngineerDashboard');

        window.location.href = window.location.href;

      }  
    }
  }, [loggedIn]);

  const handleLogin = async () => {
    let endpoint = 'http://localhost:8080/auth/admin/signin'; // Default endpoint
    const loginData = { username, password };
    setUsername(username);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("Logged in user:", user);
        setUserData(user);
        localStorage.setItem("user", JSON.stringify(user));
        setLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
      } else {
        const errorResponse = await response.json(); // Parse error response
        setFailMessage(errorResponse.message); // Set the error message
        setTimeout(() => setFailMessage(""), 2000)
      }
      
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  if (loggedIn) {
    return null;
  }

  return (
    <MDBContainer className="my-5">

      <MDBCard>
        <MDBRow className='g-0'>

          <MDBCol md='6'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>

              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#98144d' }}/>
                <span className="h1 fw-bold mb-0">Customer Support Portal</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
                <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text' size="lg" 
                    value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}/>

                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}/>

                <MDBBtn className="mb-4 px-5" size='lg' style={{ backgroundColor: '#98144d' }} onClick={handleLogin}>
                  Login
                </MDBBtn>

              <div>
              {failMessage && (
                 <div className="alert alert-fail" role="alert" style={{ backgroundColor: 'red', color: 'white' }}>
                 {failMessage}
               </div>
              )}
            </div>
              <a className="small text-muted" href="/forgot-password">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{color: '#98144d'}}>Don't have an account? <a href="http://localhost:3000/register" style={{color: '#98144d'}}>Register here</a></p>
              <div className='d-flex flex-row justify-content-start'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>

            </MDBCardBody>
          </MDBCol>

        </MDBRow>
      </MDBCard>

    </MDBContainer>
    
  );
}

export default LoginPage;