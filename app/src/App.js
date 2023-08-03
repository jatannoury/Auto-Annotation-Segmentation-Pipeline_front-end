import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./screens/Home";
import InstantPrediction from "./screens/InstantPrediction";
function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/Register" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Instant-Prediction" element={<InstantPrediction />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
