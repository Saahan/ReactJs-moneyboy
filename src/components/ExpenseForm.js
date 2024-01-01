import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./transaction.css";

export default function ExpenseForm(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit(e) {
    //make a POST request to send "add expense" data obtained from forms to the backend to be saved in the database.
    e.preventDefault();

    fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      body: JSON.stringify({
        amount: e.target[0].value,
        date: e.target[1].value,
        type: e.target[2].value,
        notes: e.target[3].value,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(props.runMainUseEffect()); //refresh props by making a GET request in the Main.js component

    setShow(false);
  }

  return (
    <>
      <Button className="add-button" onClick={handleShow}>
        Add Expense
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="form-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: "#6639a6" }}>
            Add Expense
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
                    id="expense-amount"
                  />
                </FloatingLabel>
              </div>
              <div className="form-inputs">
                <FloatingLabel label="Date">
                  <Form.Control type="date" placeholder="Date" required />
                </FloatingLabel>
              </div>
              <div className="form-inputs">
                <FloatingLabel label="Expense Type">
                  <Form.Select
                    aria-label="Expense Type Selection"
                    className="form-select"
                  >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Rent">Rent</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </FloatingLabel>
              </div>
              <div className="form-inputs">
                <FloatingLabel label="Notes" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Notes"
                    required
                    maxLength={"30"}
                    id="expense-notes"
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
