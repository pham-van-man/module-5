import axios from "axios";
import {put, takeLatest, select} from "redux-saga/effects";
import {
    DELETE, DELETE_SUCCESS,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    LOGIN,
    LOGIN_SUCCESS
} from "../redux/action";

const BaseURL = "https://jsonplaceholder.typicode.com/users";

function* getUser(action) {
    try {
        const response = yield axios.get(BaseURL);
        yield put({type: FETCH_USER_SUCCESS, payload: response.data});
    } catch (error) {
        console.log("error - getUser : ", error);
    }
}

function* authSagaFun(action) {
    const user = action.payload;
    if (user.username === "admin" && user.password === "letmein") {
        yield put({type: LOGIN_SUCCESS, payload: user});
        yield put({type: FETCH_USER, payload: {}});
    }
}

function* deleteUser(action) {
    try {
        yield axios.delete(BaseURL + "/" + action.payload.id);
        const users = yield select(state => state.users);
        const updatedUsers = users.filter(user => user.id !== action.payload.id);
        yield put({type: DELETE_SUCCESS, payload: updatedUsers});
    } catch (error) {
        console.log("error - getUser : ", error);
    }
}

export default function* rootSaga() {
    yield takeLatest(LOGIN, authSagaFun);
    yield takeLatest(FETCH_USER, getUser);
    yield takeLatest(DELETE, deleteUser);
}