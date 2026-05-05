import { useState } from "react";
import BoothSelect from "./components/BoothSelect";
import Voting from "./components/Voting";
import Confirm from "./components/Confirm";
import Verify from "./components/Verify";
import Results from "./components/Results";

function App() {
  const [step, setStep] = useState(0);
  const [booth, setBooth] = useState("");
  const [receipt, setReceipt] = useState("");

  const voter = {
    name: "Surya",
    constituency: "Delhi",
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        E-Voting System
      </h1>

      {/* Navigation */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setStep(1)} className="btn">
          Vote
        </button>
        <button onClick={() => setStep(4)} className="btn">
          Verify
        </button>
        <button onClick={() => setStep(5)} className="btn">
          Results
        </button>
      </div>

      {step === 1 && (
        <BoothSelect
          setBooth={setBooth}
          next={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <Voting
          voter={voter}
          booth={booth}
          setReceipt={setReceipt}
          next={() => setStep(3)}
        />
      )}

      {step === 3 && <Confirm receipt={receipt} />}

      {step === 4 && <Verify />}

      {step === 5 && <Results />}
    </div>
  );
}

export default App;