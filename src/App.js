import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import Register from "./Components/Register/Register";
import CustomerDashboard from "./Components/CustomerDashboard/CustomerDashboard";
import EngineerDashboard from "./Components/EngineerDashboard/EngineerDasboard";
import TokenContextProvider from "./TokenContext";
import Header from "./Components/Header/EngineerDasboardHeader"; 
import { LandingHeader } from "./Components/LandingHeader"; 
import { About } from "./Components/about";
import { Services } from "./Components/service";
import { Gallery } from "./Components/gallery";
import FAQComponent from "./Components/FAQComponent";
import ChatComponent from "./Components/ChatComponent";
import { Contact } from "./Components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import { Table } from 'reactstrap';
import UpdateComplaints from './Components/UpdateComplaints/UpdateComplaints';
import AddFAQsPage from "./Components/AddFAQ/AddFAQsPage";
import Logout from "./Components/Logout/Logout";
import "./App.css";
import AddComplaints from "./Components/AddComplaints/AddComplaints";
import ForgotPasswordPage from "./Components/ForgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "./Components/ForgotPassword/ResetPasswordPage";
import UpdateUserPage from "./Components/UpdateUserPage/UpdateUserPage";
import ViewComplaints from "./Components/ViewComplaints/ViewComplaints";
import UpdateAdmin from "./Components/UpdateUserPage/UpdateAdmin";
import ComplaintChart from "./Components/ComplaintChart";
import AdminComplaintChart from "./Components/AdminComplaintChart";
import AdminComplaintTables from "./Components/AdminComplaintTables";
import Calendar from "./Components/Calendar/Calendar";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [landingPageData, setLandingPageData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false); // Initial value set to false
  const [userData, setUserData] = useState(null); // Define userData state

  useEffect(() => {
    setLandingPageData(JsonData);

    // Retrieve the token from local storage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    // Retrieve the user data from local storage
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      setUserData(storedUserData);
      setLoggedIn(true); 
      
    }
  }, []);

  return (
    <TokenContextProvider>
      <Router>
        
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login/CustomerDashboard"
            element={<CustomerDashboard />}
          />
          <Route
            path="/login/EngineerDashboard"
            element={<EngineerDashboard />}
          />
          <Route
            path="/"
            element={
              <MainPage
                landingPageData={landingPageData}
                token={token}
                setToken={setToken}
                loggedIn={loggedIn}
                userData={userData} // Pass the userData here
              />
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="/updateUser" element={<UpdateUserPage />} />
          <Route path="/updateAdmin" element={<UpdateAdmin />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/viewComplaints" element={<ViewComplaints />} />
          <Route path="/faqs" element={<FAQComponent />} />
          <Route path="/login/EngineerDashboard/postfaqs" element={<AddFAQsPage />} />
          <Route path="/login/EngineerDashboard/logout" element={<Logout />} />   
          <Route path="/AddComplaints" element={<AddComplaints userData={userData} />} />
          <Route path="/complaint-chart" element={<ComplaintChart />} />
          <Route path="/AdminComplaintChart" element={<AdminComplaintChart />} />
          <Route path="/AdminComplaints" element={<AdminComplaintTables/>} />
          <Route path="/AdminCalender" element={<Calendar/>} />
          
        </Routes>
      </Router>
    </TokenContextProvider>
  );
}

const MainPage = ({ landingPageData, loggedIn, userData }) => (
  <div>
    <LandingHeader data={landingPageData.LandingHeader} loggedIn={loggedIn} userData={userData} />
    <About data={landingPageData.About} />
    <Services data={landingPageData.Services} />
    <Gallery data={landingPageData.Gallery} />
    <FAQComponent />
    <ChatComponent />
    <Contact data={landingPageData.Contact} />
  </div>
);

export default App;
