import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./navbar.css";

export default function NavBar(props) {
  const [display, setDisplay] = useState("Dashboard");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleClick(e) {
    setDisplay(() => e.target.outerText);
    setShow(false);
  }

  useEffect(() => {
    props.passData(display);
  });

  return (
    <Container className="navbar-container">
      <Navbar expand="lg" className="custom-navbar">
        <img
          src="/img/Moneyboy.png"
          width="160px"
          height="60px"
          className="nav-logo"
          alt="no-logo"
        ></img>
        <Container className="justify-content-end nav-items">
          <div className="nav-item" onClick={handleClick}>
            Dashboard
          </div>
          <div className="nav-item">|</div>
          <div className="nav-item" onClick={handleClick}>
            Analysis
          </div>
          <div className="nav-item">|</div>
          <div className="nav-item" onClick={handleClick}>
            Transaction
          </div>
        </Container>
        <Container className="justify-content-end nav-items-responsive">
          <div className="nav-item" onClick={handleShow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="purple"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img
              src="/img/Moneyboy.png"
              width="160px"
              height="60px"
              className="nav-logo"
              alt="no-logo"
            ></img>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container className="menu-container-responsive">
            <div className="nav-item-responsive" onClick={handleClick}>
              Dashboard
            </div>

            <div className="nav-item-responsive" onClick={handleClick}>
              Analysis
            </div>

            <div className="nav-item-responsive" onClick={handleClick}>
              Transaction
            </div>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}
