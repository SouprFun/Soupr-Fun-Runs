import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* runSaga() {
    yield takeLatest('RUN_INPUTS', addRun)
}

function* addRun(action) {
    console.log("in add run saga", action.payload);
    // try{
    //     yield axios.post('/api/runs', action.payload)
    // }catch{
    //     console.log("error in addRun saga");
    // }
}

export default runSaga;