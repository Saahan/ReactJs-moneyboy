import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./transaction.css";

export default function IncomeForm(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5000/api/income", {
      method: "POST",
      body: JSON.stringify({
        amount: e.target[0].value,
        date: e.target[1].value,
        type: e.target[2].value,
        notes: e.target[3].value,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(props.runMainUseEffect());

    setShow(false);
  }

  return (
    <>
      <Button className="add-button" onClick={handleShow}>
        Add Income
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="form-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: "#6639a6" }}>
            Add Income
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Form onSubmit={handleSubmit}>
              <div className="form-inputs">
                <FloatingLabel label="Amount" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="$"
                    required
                    id="income-amount"
                  />
                </FloatingLabel>
              </div>
              <div className="form-inputs">
                <FloatingLabel label="Date">
                  <Form.Control type="date" placeholder="Date" required />
                </FloatingLabel>
              </div>
              <div className="form-inputs">
                <FloatingLabel label="Income Type">
                  <Form.Select
                    aria-label="Income Type Selection"
                    className="form-select"
                  >
                    <option value="Salary">Salary</option>
                    <option value="Returns">Tax Returns</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </FloatingLabel>
              </div>
              <div className="form-inputs">
                <FloatingLabel label="Notes" className="mb-3">
                  <Form.Control
                    type="text"
                    id="income-notes"
                    placeholder="Notes"
                    required
                    maxLength={"30"}
                  />
                </FloatingLabel>
              </div>
              <div className="form-inputs">
                <Button type="submit" className="input-add-button">
                  Add
                </Button>
              </div>
            </Form>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
