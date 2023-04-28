import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rooutReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const persistConfig = {
  key: "authType",
  storage: storage,
};

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, compose(applyMiddleware(thunk), devTools));

const persistor = persistStore(store);

export { persistor, store };
