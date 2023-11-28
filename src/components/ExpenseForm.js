import React, { useEffect, useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./transaction.css";

export default function ExpenseForm(props) {
  const [show, setShow] = useState(false);
  const [expenseData, setExpenseData] = useState({
    amount: 0,
    date: "",
    type: "",
    notes: "",
  });

  const isMounted = useRef(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit(e) {
    e.preventDefault();
    setExpenseData(() => {
      return {
        amount: e.target[0].value,
        date: e.target[1].value,
        type: e.target[2].value,
        notes: e.target[3].value,
      };
    });
    setShow(false);
  }

  useEffect(() => {
    if (isMounted.current) {
      console.log("useffect run", expenseData);

      fetch("http://localhost:5000/api/expenses", {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: { "Content-Type": "application/json" },
      });
    } else isMounted.current = true;

    props.runMainUseEffect();
  }, [expenseData]);

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
                <FloatingLabel
           
                  label="Amount"
                  className="mb-3"
                >
                  <Form.Control type="number" placeholder="$" required id="expense-amount"/>
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
                    <option value="Transportation">Transportation</option>
                    <option value="Rent">Rent</option>
                    <option value="Medical">Medical</option>
                  </Form.Select>
                </FloatingLabel>
              </div>
              <div className="form-inputs">
                <FloatingLabel
                  label="Notes"
                  className="mb-3"
                >
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
