import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* runSaga() {
    yield takeLatest('RUN_INPUTS', addRun);
    yield takeLatest('FETCH_RUNS', fetchRuns);
    yield takeLatest('EDIT_RUN', editRun);
    yield takeLatest('DELETE', deleteRun)
}

function* fetchRuns(action) {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    };

    try {

        const response = yield axios.get('/api/runs');
        console.log("response in fetch runs saga: ", response);
        yield put({ type: 'SET_RUNS', payload: response.data });
    } catch {
        console.log('error in SAGA GETing runs.');
    }
}

function* deleteRun(action) {

    console.log("in delete saga,", action.payload);
   try {
        yield axios.delete(`/api/runs/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_RUNS' })
    } catch {
        console.log("error in deleteRun saga");

    }

}

function* editRun(action) {
    console.log("in edit saga,", action.payload);
    try {
        yield axios.put(`/api/runs/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_RUNS' })
    } catch {
        console.log("error in editRun saga");

    }

}

function* addRun(action) {
    console.log("in add run saga", action.payload);

    try {
        yield axios.post('/api/runs', action.payload);
        const response = yield axios.get('/api/runs');
        console.log("response in addRun saga", response);
        yield put({ type: 'FETCH_RUNS' })
    } catch {
        console.log("error in addRun saga");
    }
}

export default runSaga;