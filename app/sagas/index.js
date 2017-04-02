import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* register(action) {
  try {
    const data = action.meta.data;
    const resp = yield call(axios.post, '/register', data);
    yield put({ type: 'REGISTER/SUCCESS', payload: resp });
  } catch (err) {
    yield put({ type: 'REGISTER/FAIL', error: err });
  }
}

export function* todoList() {
  try {
    const resp = yield call(axios.get, '/todos');
    yield put({ type: 'LIST_RECEIVE', payload: resp });
  } catch (err) {
    yield put({ type: 'LIST_FAIL', error: err });
  }
}

function* createTodo(action) {
  try {
    const data = action.meta.data;
    const resp = yield call(axios.post, '/todos', data);
    yield put({ type: 'CREATE_TODO/SUCCESS', payload: resp });
  } catch (err) {
    yield put({ type: 'CREATE_TODO/SUCCESS', error: err });
  }
}

function* editTodo(action) {
  try {
    const data = action.meta.data;
    const id = action.meta.id;
    const resp = yield call(axios.get, `/todos/${id}`, data);
    yield put({ type: 'TODO_EDIT/SUCCESS', payload: resp });
  } catch (err) {
    yield put({ type: 'TODO_EDIT/FAIL', error: err });
  }
}

function* rootSagas() {
  yield [
    takeEvery('REGISTER', register),
    takeEvery('LIST_LOAD', todoList),
    takeEvery('CREATE_TODO', createTodo),
    takeEvery('TODO_EDIT', editTodo),
  ];
}

export default rootSagas;
