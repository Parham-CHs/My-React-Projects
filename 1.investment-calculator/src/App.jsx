import Header from "./components/Header.jsx"
import UserInput from "./components/UserInput.jsx"
import DataTable from "./components/DataTable.jsx"
import { useState } from "react";

function App() {
  const [userInputValue, setUserInput] = useState({
    initialInvestment:10000,
    annualInvestment:1200,
    expectedReturn:6,
    duration:10,
  })
  
  function handleInputChange({ inputID, value }) {
    setUserInput(prevInput => {
        return {
            ...prevInput,
            [inputID]:+value
        }
    });
  };




  return (
    <>
    <Header />
    <UserInput userInput={userInputValue} setInput={handleInputChange} />
    <DataTable userInput={userInputValue} />
    </>
  )
}

export default App
