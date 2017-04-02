import { call, put } from 'redux-saga/effects';
import axios from 'axios';

function* todoListRoot() {
  try {
    const resp = yield call(axios.get, '/todos');
    yield put({ type: 'LIST_RECEIVE', payload: resp });
  } catch (err) {
    yield put({ type: 'LIST_FAIL', error: err });
  }
}

export default function requireRootSaga(path) {
  if (path === '/demo') {
    return todoListRoot;
  }
  return null;
}
