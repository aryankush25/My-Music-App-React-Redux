import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/custom.scss';
// import Routes from './routes/'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

ReactDOM.render(<App />, document.getElementById('root'));