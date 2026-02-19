import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
function Home() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const calculateBMI = () => {
    if (weight > 0 && height > 0 && age > 0 && name !== "") {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      navigate("/result", {
        state: { bmi: bmiValue, age: age, name: name }
      });
    } else {
      alert("Please enter valid name, weight, height, and age");
    }
  };

  return (
    <div className="container">
      <h1>BMI Calculator</h1>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        type="number"
        placeholder="Enter weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <br />

      <input
        type="number"
        placeholder="Enter height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <br />

      <input
        type="number"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br />

      <button onClick={calculateBMI}>Calculate BMI</button>
    </div>
  );
}
function Result() {
  const location = useLocation();
  const { bmi, age, name } = location.state || {};
  const getBMIImage = (bmiValue) => {
    if (bmiValue < 18.5) {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Ore_EQBkBhFu3nztpH_2Yu7UeoRMScW69w&s"; 
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBVGhiYllcavQNDel2qChwo7pxUnVtwBN91g&s"; 
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      return "https://thumbs.dreamstime.com/b/cute-fat-girl-dancing-floor-blury-trees-background-park-ai-generative-bokeh-light-319514235.jpg"; 
    } else {
      return "https://img.freepik.com/free-vector/hand-drawn-fat-person-cartoon-illustration_52683-117783.jpg?semt=ais_user_personalization&w=740&q=80";
    }
  };

  return (
    <div className="container">
      <h1>BMI Result</h1>
      <h2>{name}, your BMI is: {bmi}</h2>
      <p>Age: {age}</p>
      <img
        src={getBMIImage(parseFloat(bmi))}
        alt="BMI Illustration"
        className="result-img"
      />

      <br />
      <a href="/">Calculate Again</a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
