import { all, fork, takeEvery } from 'redux-saga/effects';
// import axios from 'axios';

import { LOAD_USER_REQUEST } from '../reducers/user';

// function* loadUserAPI() {
// 	// return axios.get('', {});
// }

function* loadUser() {
	// try {
	// 	// const result = yield call(loadUserAPI);
	// 	// console.log(result);
	// 	// yield put({
	// 	//     type: LOAD_USER_SUCCESS,
	// 	//     data: result.data,
	// 	// })
	// } catch (e) {
	// 	// console.error(e);
	// }
}
function* watchLoadUser() {
	yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
	yield all([fork(watchLoadUser)]);
}
