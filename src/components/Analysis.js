import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./analysis.css";
import { totalByType } from "../functions/arrayOperations";

export default function Analysis(props) {
  let expenseData = props.expenseData;
  let incomeData = props.incomeData;

  let chartExpenseData = [
    { amount: totalByType(expenseData, "Food"), type: "Food" },
    {
      amount: totalByType(expenseData, "Transport"),
      type: "Transport",
    },
    { amount: totalByType(expenseData, "Rent"), type: "Rent" },
    { amount: totalByType(expenseData, "Other"), type: "Other" },
  ];

  let chartIncomeData = [
    { amount: totalByType(incomeData, "Salary"), type: "Salary" },
    {
      amount: totalByType(incomeData, "Returns"),
      type: "Returns",
    },
    { amount: totalByType(incomeData, "Other"), type: "Other" },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Container>
      <Container style={{ marginBottom: "50px" }}>
        <div className="expense-data-container">
          <p style={{ color: "#6639a6" }}>Charts</p>
          <hr />
        </div>
      </Container>
      <Row className="pie-row">
        <Col lg="6" md="6" sm="12">
          <PieChart width={300} height={300} className="pie-chart">
            <Pie
              data={chartExpenseData}
              dataKey="amount"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {chartExpenseData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend height={36} verticalAlign="top" />
          </PieChart>
        </Col>
        <Col lg="6" md="6" sm="12" className="pie-chart-col">
          <PieChart width={300} height={300} className="pie-chart">
            <Pie
              data={chartIncomeData}
              dataKey="amount"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
            >
              {chartIncomeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
          </PieChart>
        </Col>
      </Row>
    </Container>
  );
}
