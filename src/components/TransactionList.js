import React, { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import TransactionForm from "./TransactionForm";
import TransactionFilter from "./TransactionFilter";
import "./TransactionList.css";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTransaction, setSearchTransaction] = useState("");
  const [sortTransaction, setSortTransaction] = useState("Default");

  const fetchData = () => {
    fetch("http://localhost:8001/transactions")
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the transactions");
        }
        return res.json();
      })
      .then((data) => {
        setTransactions(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8001/transactions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert(`The transaction of id ${id} has been deleted.`);
        fetchData();
      });
  };

  const handleFormSubmit = (newTransaction) => {
    const capitalizedCategory =
      newTransaction.category.charAt(0).toUpperCase() +
      newTransaction.category.slice(1);

    const modifiedTransaction = {
      ...newTransaction,
      category: capitalizedCategory,
    };

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      modifiedTransaction,
    ]);
  };

  const handleSearchChange = (term) => {
    setSearchTransaction(term);
  };

  const handleSortChange = (option) => {
    setSortTransaction(option);
  };

  const transactionsFiltered = transactions.filter((transaction) =>
    transaction.description
      .toLowerCase()
      .includes(searchTransaction.toLowerCase())
  );

  const transactionsToDisplay =
    sortTransaction === "alphabetical"
      ? [...transactionsFiltered].sort((a, b) =>
          a.category.localeCompare(b.category)
        )
      : transactionsFiltered;

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <TransactionFilter
            search={searchTransaction}
            onSearchChange={handleSearchChange}
            handleSortChange={handleSortChange}
          />
          <div className="content">
            <div className="transactionForm">
              <TransactionForm onFormSubmit={handleFormSubmit} />
            </div>

            <div className="transactionItemTable">
              <TransactionItem
                transactions={transactionsToDisplay}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
