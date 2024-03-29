import React from "react";

export default function ExpenseItem({ expense, handleDelete, handleEdit }) {
  return (
    <li>
      <div>
        <span>{expense.charge}</span> <span>{expense.amount}</span>
      </div>
      <div>
        <button onClick={() => handleEdit(expense.id)}>수정</button>
        <button onClick={() => handleDelete(expense.id)}>삭제</button>
      </div>
    </li>
  );
}
