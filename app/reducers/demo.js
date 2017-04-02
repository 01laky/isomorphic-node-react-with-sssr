const LIST_LOAD = 'LIST_LOAD';
const LIST_RECEIVE = 'LIST_RECEIVE';
const LIST_FAIL = 'LIST_FAIL';

const CREATE_TODO = 'CREATE_TODO';
const CREATE_TODO_SUCCESS = 'CREATE_TODO/SUCCESS';
const CREATE_TODO_FAIL = 'CREATE_TODO/FAIL';

const UPDATE_TODO = 'UPDATE_TODO';
const UPDATE_TODO_SUCCESS = 'UPDATE_TODO/SUCCESS';

const OPEN_TODO_FORM = 'OPEN_TODO_FORM';
const CLOSE_TODO_FORM = 'CLOSE_TODO_FORM';

const initialState = {
  loading: true,
  loaded: false,
  todoList: [],
  openAction: null,
  openId: null,
  error: null
};

export default (state = initialState, action = {}) => {
  if (action.type === LIST_LOAD) {
    return { ...state, loading: true };
  } else if (action.type === LIST_RECEIVE) {
    return {
      ...state,
      loaded: true,
      loading: false,
      todoList: action.payload.data
    };
  } else if (action.type === OPEN_TODO_FORM) {
    return {
      ...state,
      openAction: action.meta.id ? 'update' : 'create',
      openId: action.meta.id
    };
  } else if (action.type === CLOSE_TODO_FORM) {
    return { ...state, openAction: null, openId: null };
  } else if (action.type === LIST_FAIL) {
    return { ...state, loaded: false, loading: false, error: action.payload };
  } else if (action.type === CREATE_TODO) {
    return { ...state, loading: true };
  } else if (action.type === CREATE_TODO_SUCCESS) {
    const nextList = [...state.todoList];
    nextList.push(action.payload.data);
    return { ...state, loaded: true, loading: false, todoList: nextList };
  } else if (action.type === UPDATE_TODO) {
    return { ...state, loading: true };
  } else if (action.type === UPDATE_TODO_SUCCESS) {
    const nextList = state.todoList.filter(todo => todo.id !== action.payload.data.id);
    nextList.push(action.payload.data);
    return { ...state, loaded: true, loading: false, todoList: nextList };
  } else if (action.type === CREATE_TODO_FAIL) {
    return { ...state, loaded: false, loading: false, error: action.payload };
  }

  return state;
};
