import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './components/App';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/custom.scss';

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));