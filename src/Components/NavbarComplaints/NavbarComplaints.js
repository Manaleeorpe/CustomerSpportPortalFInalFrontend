import React, { useState } from "react";
import { NavLink, Link  } from "react-router-dom";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "react-bootstrap";

function NavbarComplaints({ loggedIn }) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  return (
    <Navbar style={{ backgroundColor: "#98144d", position: "relative", marginTop: "-7px"  }} expand="lg" variant="dark">
      <Link to="/" className="navbar-brand">
        <img
          src="/img/Axis Bank.png"
          width="150"
          height="45"
          className="d-inline-block align-top"
          alt="logo"
        />
      </Link>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", alignItems: "center" }}>
        <li style={{ marginRight: "20px" }}>
          <NavLink to="/ViewComplaints" style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            View Complaints
          </NavLink>
        </li>
        <li style={{ marginRight: "20px" }}>
          <NavLink to="/AddComplaints" style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            Add Complaints
          </NavLink>
        </li>
        <li>
          <Link to="/" style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s", fontSize: "16px" }}>
            <FontAwesomeIcon icon={faHome} style={{ marginLeft: "900px" }} />
          </Link>
        </li>
      </ul>
    </Navbar>
  );
}

export default NavbarComplaints;
