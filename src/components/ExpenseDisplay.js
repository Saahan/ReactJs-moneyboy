import React from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./expense-income-display.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ExpenseDisplay(props) {
  function deleteClick(id) {
    //function which makes a DELETE request to the back-end to delete an expense object in the database, id is passed down from the onClick handler down in the array.map return statement.
    fetch("http://localhost:5000/api/deleteexpenses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id }),
    }).finally(props.runMainUseEffect());
  }

  return (
    <>
      <Container>
        <div className="expense-data-container">
          <p style={{ color: "#6639a6" }}>Expenses</p>
          <hr />
        </div>
      </Container>
      <Container>
        {props.expenseData.map((item) => {
          return (
            <div className="expense-display-div" key={item._id}>
              <Card className="text-center expense-display-card">
                <Card.Body>
                  <Card.Title className="card-expense-title">
                    ${item.amount}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 card-date">
                    {item.date}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 card-type">
                    {item.type}
                  </Card.Subtitle>
                  <Card.Text className="text-muted card-notes">
                    {item.notes}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted card-footer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    className="bi bi-trash3-fill btn-delete"
                    viewBox="0 0 16 16"
                    onClick={() => {
                      deleteClick(item._id);
                    }}
                  >
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                  </svg>
                </Card.Footer>
              </Card>
            </div>
          );
        })}
      </Container>
    </>
  );
}
