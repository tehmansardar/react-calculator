import React, {useState} from 'react';
import ExpenseList from './componentes/ExpenseList'
import ExpenseForm from './componentes/ExpenseForm'
import Alert from './componentes/Alert'
import uuid from 'uuid/v4'
import './App.css';

function App() {

  const initialExpenses = [
    {id: uuid(), charge : 'rent', amount : 200},
    {id: uuid(), charge : 'car Payment', amount : 400},
    {id: uuid(), charge : 'credit cart bill', amount : 1000}
  ]
  
  // ***** state values ******
  // All expenses, add expenses
  const [expenses, setExpenses] = useState(initialExpenses)
  //single expense
  const [charge, setCharge] = useState("")
  // single amount
  const [amount, setAmount] = useState("")
  // Alert
  const [alert, setAlert] = useState({show:false})

  // **** functionality
  const handleCharge = e => {
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  // handleAlert
  const handleAlert = ({type, text}) => {
    setAlert({show:true, type, text})
    setTimeout(()=>{
      setAlert({show : false})
    },3000)
  }
  const handleSubmit = e =>{
    e.preventDefault()
    if(charge !=='' && amount>0){
      handleAlert({type:"success", text:"Item added"})
      const singleExpense = {id : uuid(), charge, amount}
      setExpenses([...expenses,singleExpense])
      setCharge("")
      setAmount("")
    }else{
      // handle alert called
      handleAlert({
        type : "danger",
        text : `charge can't be empty value and amount value has must to be bigger than zero`
      })
    }
  }

  // clear all items
  const clearItems = () => {
    setExpenses([])
    handleAlert({type:"danger", text:"All items deleted"})
    console.log('clear all items')
  }
  // handle delete
  const handleDelete = id => {
    let tempExpenses = expenses.filter(item => item.id !== id)
    setExpenses(tempExpenses)
    handleAlert({type:"danger", text:"item deleted"})
  }
  // handle edit
  const handleEdit = id => {
    console.log(`item Edited id: ${id}`)
  }

  
  return (
    <>
      { alert.show && <Alert type={alert.type} text={alert.text} /> }
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge = {charge}
          amount = {amount}
          handleAmount = {handleAmount}
          handleCharge = {handleCharge}
          handleSubmit = {handleSubmit}
        />
        <ExpenseList 
          expenses = {expenses}
          handleDelete = {handleDelete}
          handleEdit = {handleEdit}
          clearItems = {clearItems} 
        />
      </main>
      <h1>
        total spending : { " " }
        <span className="total">
          $
          {expenses.reduce((acc, curr)=>{
            return acc += parseInt(curr.amount)
          }, 0)}
        </span>
      </h1>      
    </>
  );
}

export default App;
