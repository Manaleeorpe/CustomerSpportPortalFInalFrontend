import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import {
  faBarsProgress,
  faClock,
  faCheck,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { blue, yellow } from "@mui/material/colors";

const ComplaintTracker = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("http://localhost:8080/auth/admin/getProgress", {
      credentials: 'include', // Add credentials option here
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  const cardStyle = {
    width: "230px", // Set the width of the cards
    margin: "30px", // Add margin to all sides
  };

  const iconStyle = {
    fontSize: "40px",
    color: "white", // Adjust the font size to make the icon larger
  };


  const pendingCardStyle = {
    ...cardStyle,
    backgroundColor: "rgba(255, 0, 0, 0.5)", 
  };

  const InProgressCardStyle = {
    ...cardStyle,
    backgroundColor: "rgba(0, 0, 255, 0.5)", 
  };
  const ResolvedCardStyle = {
    ...cardStyle,
    backgroundColor: "rgba(128, 0, 128, 0.5)" , 
  };
  const CancelledCardStyle = {
    ...cardStyle,
    backgroundColor: "rgba(102, 102, 102, 0.6)", 
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="d-flex">
          <Card style={pendingCardStyle}> {/* Apply the yellow background to this card */}
            <CardBody>
              <div className="d-flex">
                <div className="ms-5 mt-2">
                  <FontAwesomeIcon icon={faClock} style={iconStyle} />
                </div>
                <div className="ms-5">
                  <h3 className="mb-0 font-weight-bold" >
                    {data.Pending}
                  </h3>
                  <small className="text-muted" >
                    Pending
                  </small>
                </div>
              </div>
            </CardBody>
          </Card >
          <Card style={InProgressCardStyle}>
            <CardBody>
              <div className="d-flex">
                <div className="ms-5 mt-2">
                  <FontAwesomeIcon icon={faBarsProgress} style={iconStyle} />
                </div>
                <div className="ms-5">
                  <h3 className="mb-0 font-weight-bold" >
                    {data.InProgress}
                  </h3>
                  <small className="text-muted" >
                    In Progress
                  </small>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card style={ResolvedCardStyle}>
            <CardBody>
              <div className="d-flex">
                <div className="ms-5 mt-2">
                  <FontAwesomeIcon icon={faCheck} style={iconStyle} />
                </div>
                <div className="ms-5">
                  <h3 className="mb-0 font-weight-bold" >
                    {data.Resolved}
                  </h3>
                  <small className="text-muted" >
                    Resolved
                  </small>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card style={CancelledCardStyle}>
            <CardBody>
              <div className="d-flex">
                <div className="ms-5 mt-2">
                  <FontAwesomeIcon icon={faBan} style={iconStyle} />
                </div>
                <div className="ms-5">
                  <h3 className="mb-0 font-weight-bold" >
                    {data.Cancelled}
                  </h3>
                  <small className="text-muted" >
                    Cancelled
                  </small>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ComplaintTracker;