import React, { useEffect, useState } from "react";
import "./main.css";
import NavBar from "./NavBar";
import Home from "./Home";
import Analysis from "./Analysis";
import AddTransaction from "./AddTransaction";
import ReactLoading from "react-loading";

export default function Main() {
  const [displayPage, setDisplayPage] = useState("Dashboard");
  const [expenseData, setExpenseData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [runMainFetch, setRunMainFetch] = useState(false);

  function passData(e) {
    setDisplayPage(e);
  }

  function runMainUseEffect(view) {
    console.log(view, "runmainuseffect run");
    setRunMainFetch(true);
    setTimeout(() => {
      setRunMainFetch(false);
    }, 2000);
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setExpenseData(data);
        console.log("expsnse data:", data);
      })
      .then(
        fetch("http://localhost:5000/api/income", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            //console.log(data);
            setIncomeData(data);
            console.log("Income data", data);
          })
      );
    console.log("main useffect run");
  }, [runMainFetch]);

  // eslint-disable-next-line
  switch (displayPage) {
    case "Dashboard":
      return (
        <div>
          <NavBar passData={passData} />
          {expenseData !== null && incomeData !== null ? (
            <Home expenseData={expenseData} incomeData={incomeData} />
          ) : (
            <ReactLoading type="bars" color="darkblue" className="loading" />
          )}
        </div>
      );

    case "Analysis":
      return (
        <div>
          <NavBar passData={passData} />
          {expenseData !== null && incomeData !== null ? (
            <Analysis expenseData={expenseData} incomeData={incomeData} />
          ) : (
            <ReactLoading type="bars" color="darkblue" className="loading" />
          )}
        </div>
      );

    case "Transaction":
      return (
        <div>
          <NavBar passData={passData} />{" "}
          {expenseData !== null && incomeData !== null ? (
            <AddTransaction
              expenseData={expenseData}
              incomeData={incomeData}
              runMainUseEffect={runMainUseEffect}
            />
          ) : (
            <ReactLoading type="bars" color="darkblue" className="loading" />
          )}
        </div>
      );

    default:
      return <ReactLoading type="bars" color="darkblue" className="loading" />;
  }
}
