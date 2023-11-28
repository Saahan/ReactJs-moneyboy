import React, { useEffect, useState } from "react";
import "./main.css";
import NavBar from "./NavBar";
import Home from "./Home";
import Analysis from "./Analysis";
import AddTransaction from "./AddTransaction";

export default function Main() {
  const [displayPage, setDisplayPage] = useState("Dashboard");
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [runMainFetch, setRunMainFetch] = useState(false);

  const [expenseRender, setExpenseRender] = useState(false);
  const [incomeRender, setIncomeRender] = useState(false);

  function passData(e) {
    setDisplayPage(e);
  }

  function runMainUseEffect() {
    if (runMainFetch === false) setRunMainFetch(true);
    else if (runMainFetch === true) setRunMainFetch(false);
  }

  function fetchExpenseData() {
    setExpenseRender(false);
    fetch("http://localhost:5000/api/expenses", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setExpenseData(() => {
          return data;
        });
      }).finally(() => {setExpenseRender(true)});
  }

  function fetchIncomeData() {
    setIncomeRender(false);
    fetch("http://localhost:5000/api/income", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setIncomeData(() => {
          return data;
        });
      }).finally(() => {setIncomeRender(true)});
  }

  useEffect(() => {
    fetchExpenseData();
    fetchIncomeData();
    console.log("main useffect run");
  }, [runMainFetch]);

  return (
    <div>
      <NavBar passData={passData} />
      {displayPage === "Dashboard" && expenseRender === true && incomeRender === true && (
        <Home expenseData={expenseData} incomeData={incomeData} />
      )}
      {displayPage === "Analysis" && expenseRender === true && incomeRender === true && (
        <Analysis expenseData={expenseData} incomeData={incomeData} />
      )}
      {displayPage === "Transaction" && (
        <AddTransaction
          expenseData={expenseData}
          incomeData={incomeData}
          runMainUseEffect={runMainUseEffect}
        />
      )}
    </div>
  );
}
