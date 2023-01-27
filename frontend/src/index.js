import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Layout from './Components/Layout';  
import './Assets/boxicons-2.0.7/css/boxicons.min.css';
import DataProvider from './Redux/store'
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
         <Layout/>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
