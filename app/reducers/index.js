import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import demo from './demo';

const rootReducer = combineReducers({
  auth,
  routing,
  demo,
  form: formReducer
});

export default rootReducer;
