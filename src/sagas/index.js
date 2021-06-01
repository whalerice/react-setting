import { all, call } from 'redux-saga/effects';
import userSaga from './user';
// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3065/api';

export default function* rootSaga() {
	yield all([call(userSaga)]);
}
