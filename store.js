// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import {createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
// Imports: Redux
import rootReducer from './store/index';
// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const store = createStore(
  persistedReducer,
  {bookmarkReducer: {bookmark: []}},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export {store, persistor};
