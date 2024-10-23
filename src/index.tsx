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
import Selector from "./component/SS_4_1";
import MyClock from "./component/SS_4_1";
import selectCar from "./component/SS_4_1";
import SelectCar from "./component/SS_4_1";
import Timer from "./component/SS_4_2";
import {Counter1, Counter2} from "./component/SS_4_3";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Counter1/>
        <Counter2/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
