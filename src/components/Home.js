import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home(props) {
  let expenseData = props.expenseData;
  let incomeData = props.incomeData;

  //console.log(incomeData);

  function totalAmount(array) {
    let sum = 0;

    array.forEach((element) => {
      sum = sum + element.amount;
    });

    return sum;
  }

  function totalByType(array, type) {
    // eslint-disable-next-line
    let filteredArray = array.filter((item) => {
      if (item.type === type) return item;
    });

    return totalAmount(filteredArray);
  }

  function filterArrayByThisMonth(array) {
    let currentMonth = new Date().getMonth();
    // eslint-disable-next-line
    let filteredArray = array.filter((item) => {
      if (new Date(Date.parse(item.date)).getMonth() === currentMonth)
        return item;
    });

    return filteredArray;
  }

  return (
    <>
      <Container>
        <div className="expense-data-container">
          <p style={{ color: "#6639a6" }}>Summary</p>
          <hr />
        </div>
      </Container>
      <Container>
        <Row>
          <Col lg="4" sm="12">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Total Expenses</span>{" "}
                <span className="card-display-amount">
                  ${totalAmount(expenseData)}
                </span>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="12">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Total Income</span>{" "}
                <span className="card-display-amount">
                  ${totalAmount(incomeData)}
                </span>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="12">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Balance</span>{" "}
                <span className="card-display-amount">
                  ${totalAmount(incomeData) - totalAmount(expenseData)}
                </span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="expense-data-container">
          <p style={{ color: "#6639a6" }}>Expenses by Type</p>
          <hr />
        </div>
      </Container>
      <Container>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Food</span>{" "}
                <span className="card-display-amount">
                  ${totalByType(expenseData, "Food")}
                </span>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Transport</span>{" "}
                <span className="card-display-amount">
                  ${totalByType(expenseData, "Transport")}
                </span>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Rent</span>{" "}
                <span className="card-display-amount">
                  ${totalByType(expenseData, "Rent")}
                </span>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Other</span>{" "}
                <span className="card-display-amount">
                  ${totalByType(expenseData, "Other")}
                </span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="expense-data-container">
          <p style={{ color: "#6639a6" }}>Income by Type</p>
          <hr />
        </div>
      </Container>
      <Container>
        <Row>
          <Col lg="4" sm="12">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Salary</span>{" "}
                <span className="card-display-amount">
                  ${totalByType(incomeData, "Salary")}
                </span>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="12">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Tax Returns</span>{" "}
                <span className="card-display-amount">
                  ${totalByType(incomeData, "Returns")}
                </span>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="12">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Other</span>{" "}
                <span className="card-display-amount">
                  ${totalByType(incomeData, "Other")}
                </span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="expense-data-container">
          <p style={{ color: "#6639a6" }}>This Month</p>
          <hr />
        </div>
      </Container>
      <Container className="bottom-container">
        <Row>
          <Col lg="4" sm="12">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Expenses</span>{" "}
                <span className="card-display-amount">
                  ${totalAmount(filterArrayByThisMonth(expenseData))}
                </span>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="12">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Income</span>{" "}
                <span className="card-display-amount">
                  ${totalAmount(filterArrayByThisMonth(incomeData))}
                </span>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="12">
            <Card className="card-display">
              <Card.Body className="card-display-body">
                <span className="card-display-type">Balance</span>{" "}
                <span className="card-display-amount">
                  $
                  {totalAmount(filterArrayByThisMonth(incomeData)) -
                    totalAmount(filterArrayByThisMonth(expenseData))}
                </span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
