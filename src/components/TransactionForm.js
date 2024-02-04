import React, { useState } from "react";
import "./TransactionForm.css";

function TransactionForm({ onFormSubmit }) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Income");
  const [amount, setAmount] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const transaction = { date, description, category, amount };

    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((res) => res.json())
      .then((newTransaction) => {
        onFormSubmit(newTransaction);
        alert("The transaction was added successfully!");
        setDate("");
        setDescription("");
        setCategory("Income");
        setAmount("");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="my-form">
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="text"
            placeholder="Enter the date"
            name="date"
            id="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            placeholder="Enter the description"
            required
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Category:
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="food">Food</option>
            <option value="fashion">Fashion</option>
            <option value="gift">Gift</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
            <option value="housing">Housing</option>
          </select>
        </label>

        <label>
          Amount:
          <input
            type="text"
            placeholder="Enter the amount"
            required
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default TransactionForm;
