// Imports: Dependencies
import {combineReducers} from 'redux';
// Imports: Reducers
import bookmarkReducer from '../reducer/bookmarkReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  bookmarkReducer,
});
// Exports
export default rootReducer;
