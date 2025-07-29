import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TimerManager from "./components/TimerGroup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p className="text-3xl font-bold">Ambient Voice Technology Timer</p>
      <p className="text-m font-italic">
        made by alex bulloso for use in Cambridge University Hospitals
      </p>
      <TimerManager />
    </>
  );
}

export default App;
