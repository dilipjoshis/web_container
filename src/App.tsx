import { useState } from "react";
import MobileTextField from "./lib/MobileTextField";
import "./App.css";

function App() {
  const [value, setValue] = useState("dilip");
  return (
    <div className="App">
      <MobileTextField value={value} onChange={(value) => setValue(value)} />
    </div>
  );
}

export default App;
