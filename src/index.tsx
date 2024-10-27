import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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
import {FormEx, FileUploadPage, SignupForm, Apps, Navbar, AppTH5_1} from "./component/SS_5_TH";
import ContactForm from "./component/SS_5_1";
import Library from "./component/SS_5_2";
import MailForm from "./component/SS_5_3";
import HealthDeclaration from "./component/SS_5_4";
import {List} from "./component/SS_6_TH";
import {TodoList} from "./component/SS_6_1";
import {Book} from "./component/SS_6_2";
import {Logins, Users} from "./component/SS_7_TH";
import store from "./redux/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Logins/>}/>
                <Route path="/users" element={<Users/>}/>
            </Routes>
        </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
