import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "rent", amount: 1600 },
    { id: 2, charge: "car payment", amount: 400 },
    { id: 3, charge: "credit card bill", amount: 1200 },
  ]);

  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  };

  const clearItems = () => {
    setExpenses([]);
  };

  const handleDelete = (id) => {
    console.log(id);
    const newExpense = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpense);
  };

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(newExpenses);
        setEdit(false);
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount };
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
      }

      setCharge("");
      setAmount(0);
    } else {
      console.log("charge or amount is empty");
    }
  };

  return (
    <main className="main-container">
      <h1>예산 계산기</h1>

      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        {/* Expense Form */}
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>

      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        {/* Expense List */}
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>

      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}
      >
        <p style={{ fontSize: "2rem" }}>
          총지출:
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
            원
          </span>
        </p>
      </div>
    </main>
  );
}

export default App;
