import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* runSaga() {
    yield takeLatest('RUN_INPUTS', addRun)
    yield takeLatest('FETCH_RUNS', fetchRuns)
}

function* fetchRuns() {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    };

    try {

        const response = yield axios.get('/api/runs', config);
        console.log("response in fetch runs: ", response);
        yield put({ type: 'SET_RUNS', payload: response.data });
    } catch {
        console.log('error in SAGA GETing items.');
    }
}

function* addRun(action) {
    console.log("in add run saga", action.payload);

    try {
        yield axios.post('/api/runs', action.payload);
        const response = yield axios.get('/api/run');
        console.log("response in addRun saga", response);
        yield put({type: 'SET_RUNS'})
    } catch {
        console.log("error in addRun saga");
    }
}

export default runSaga;