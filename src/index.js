import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/custom.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(<App />, document.getElementById('root'));