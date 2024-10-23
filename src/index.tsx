import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Alert from "./component/SS_3_1";
import Calculator from "./component/SS_3_2";
import DetailPerson from "./component/SS_3_3";
import Body from "./component/SS_3_4";
import LogOut from "./component/SS_3_6";
import Todo from "./component/SS_3_7";
import Table from "./component/SS_3_8";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Table/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
