import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from "redux/Auth"; 

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  auth: authReducer,
  // 여기에 다른 리듀서들을 추가할 수 있습니다. 예: boardList: boardListSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

let persistor = persistStore(store);

export { store, persistor };