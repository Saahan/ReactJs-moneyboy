import React, { useEffect, useState } from "react";
import "./main.css";
import NavBar from "./NavBar";
import Home from "./Home";
import Analysis from "./Analysis";
import AddTransaction from "./AddTransaction";
import ReactLoading from "react-loading";

export default function Main() {
  const [displayPage, setDisplayPage] = useState("Dashboard"); //displayPage is the data obtained from NavBar which sets the display of the page as per selection in NavBar component, default to "Dashboard".
  const [expenseData, setExpenseData] = useState(null); //inititalize states for expense and income data obtained from GET request to the database
  const [incomeData, setIncomeData] = useState(null);
  const [runMainFetch, setRunMainFetch] = useState(false); //Whenever there is a refresh in the page, for example when any expense/income data is added/deleted, this state variable resets and the GET fetch is triggered in the Main.js file which resets the props and re-renders the components down the tree

  function passData(e) {
    // the function which passes data from NavBar component to set the view of the main page
    setDisplayPage(e);
  }

  function runMainUseEffect(view) {
    // the function which triggers a refresh in props down in the DOM, forcing the components to re-render
    console.log(view, "runmainuseffect run");
    setRunMainFetch(true);
    setTimeout(() => {
      setRunMainFetch(false);
    }, 2000);
  }

  useEffect(() => {
    // fetch requests to GET expense and income data from the database, this is triggered on start and on refresh during a POST/DELETE operation
    fetch("http://localhost:5000/api/expenses", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setExpenseData(data);
        console.log("expsnse data:", data); //data logging
      })
      .then(
        fetch("http://localhost:5000/api/income", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            setIncomeData(data);
            console.log("Income data", data); //data logging
          })
      );
    console.log("main useffect run");
  }, [runMainFetch]);

  switch (
    displayPage //conditional rendering of "view" as per selection in NavBar component, the three views are "Home", "Analysis" & "Transaction"
  ) {
    case "Dashboard": // the state of expense and income data set in the useeffect hook is then passed down to the view components as props
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
            <ReactLoading type="bars" color="darkblue" className="loading" /> //if both income and expense data are being fetched asynchronically, display a loading element until then
          )}
        </div>
      );

    default:
      return <ReactLoading type="bars" color="darkblue" className="loading" />;
  }
}
