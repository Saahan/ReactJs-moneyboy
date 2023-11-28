import React from "react";
import "./transaction.css";
import { Container } from "react-bootstrap";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";
import ExpenseDisplay from "./ExpenseDisplay";
import IncomeDisplay from "./IncomeDisplay";

export default function AddTransaction(props) {
  return (
    <div>
      <Container>
        <div className="form-item">
          <ExpenseForm runMainUseEffect={props.runMainUseEffect}/>
        </div>
        <div className="form-item">
          <IncomeForm runMainUseEffect={props.runMainUseEffect}/>
        </div>
      </Container>
      <div>
         <ExpenseDisplay expenseData={props.expenseData} runMainUseEffect={props.runMainUseEffect}/>
        <IncomeDisplay incomeData={props.incomeData} runMainUseEffect={props.runMainUseEffect}/>
      </div>
    </div>
  );
}
