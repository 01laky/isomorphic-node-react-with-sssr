const LOGIN = 'AUTH.LOGIN';
const LOGIN_SUCCESS = 'AUTH.LOGIN/SUCCESS';
const LOGIN_FAIL = 'AUTH.LOGIN/FAIL';

const initialState = {
  inProgress: false,
  isLoggedIn: false,
  tokken: null,
  error: null,
};

export default (state = initialState, action = {}) => {
  if (action.type === LOGIN) {
    return {...state, inProgress: true};
  } else if (action.type === LOGIN_SUCCESS) {
    return {...state, inProgress: false, tokken: action.payload.tokken};
  } else if (action.type === LOGIN_FAIL) {
    return {...state, inProgress: false, isLoggedIn: false, error: action.error};
  }

  return state;
};
