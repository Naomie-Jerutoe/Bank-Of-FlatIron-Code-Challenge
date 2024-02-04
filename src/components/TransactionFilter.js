import React from "react";
import "./TransactionFilter.css";

function TransactionFilter({ search, onSearchChange, handleSortChange }) {
  return (
    <div>
      <div className="search-bar">
        <label>
          Search Transactions
          <input
            className="search-bar-input"
            type="text"
            name="search"
            value={search}
            placeholder="Type the description"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </label>
      </div>
      <div className="sort-bar">
        <label>
          Sort Transactions By:
          <select
            name="sort"
            id="sort"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="alphabetical">Category</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default TransactionFilter;
