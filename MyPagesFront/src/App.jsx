import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TradingTable from './Trading-components/TradingTable';
import Calculator from './Calc-components/Calculator';
import NameAges from './NameAges';
import Home from './Home';
import TallinnTartu from './Taxi-components/TallinnTartu';
import Mileage from './Mileage';


const App = () => {

  
  return (
    <Router>
      <div className="container">
        <div className="router">       
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/trading">Trading Table</Link>
            </li>
            <li>
              <Link to="/calculator">Calculator</Link>
            </li>
            <li>
              <Link to="/tallinntartu">Tallinn-Tartu</Link>
            </li>
            <li>
              <Link to="/mileage">Mileage</Link>
            </li>
            <li>
              <Link to="/nameages">NameAges</Link>
            </li>
          </ul>
        </div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trading" element={<TradingTable />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/nameages" element={<NameAges />} />
          <Route path="/mileage" element={<Mileage />} />
          <Route path="/tallinntartu" element={<TallinnTartu />} />
        </Routes>
      </div>
    </Router>
  );
};



export default App;
