import React, { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import TransactionForm from "./TransactionForm";
import TransactionFilter from "./TransactionFilter";

function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTransaction, setSearchTransaction] = useState("");

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
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
  };

  const handleSearchChange = (term) => {
    setSearchTransaction(term);
  };

  const transactionsFiltered = transactions.filter((transaction) =>
    transaction.description
      .toLowerCase()
      .includes(searchTransaction.toLowerCase())
  );

  return (
    <div>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <TransactionFilter
            search={searchTransaction}
            onSearchChange={handleSearchChange}
          />
          <TransactionForm onFormSubmit={handleFormSubmit} />
          <TransactionItem
            transactions={transactionsFiltered}
            handleDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default TransactionList;
