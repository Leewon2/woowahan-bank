import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "redux/Auth";
import Finance from "./Finance";

import QuizInfo from "./QuizInfo";
import Depositor from "./Depositor";
import Savingser from "./Savingser";
import Loaner from "./Loaner";
import Family from "./Family";
import Mission from "./Mission";

const authPersistConfig = {
  key: "auth",
  storage,
};

const financePersistConfig = {
  key: "finance",
  storage,
};

const depositorPersistConfig = {
  key: "depositor",
  storage,
};

const savingserPersistConfig = {
  key: "savingser",
  storage,
};

const loanerPersistConfig = {
  key: "loaner",
  storage,
};

const quizInfoPersistConfig = {
  key: "quizInfo",
  storage,
};

const familyPersistConfig = {
  key: "family",
  storage,
};

const missionPersistConfig = {
  key: "mission",
  storage,
};

const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  finance: persistReducer(financePersistConfig, Finance),
  depositor: persistReducer(depositorPersistConfig, Depositor),
  savingser: persistReducer(savingserPersistConfig, Savingser),
  loaner: persistReducer(loanerPersistConfig, Loaner),
  quizInfo: persistReducer(quizInfoPersistConfig, QuizInfo),
  family: persistReducer(familyPersistConfig, Family),
  mission: persistReducer(missionPersistConfig, Mission),
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
