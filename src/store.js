import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistState = {
  address: "",
  isLoggedIn: false,
  jwtToken: ""
};

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["persist"]
};

const persist = (state = persistState, { type, payload }) => {
  switch (type) {
    case 'login':
      return { ...state, isLoggedIn: true, address: payload.address, jwtToken: payload.jwtToken };
    case 'logout':
      return persistState;
    default:
      return state;
  }
}

const sidebarState = {
  sidebarShow: 'responsive'
}

const changeState = (state = sidebarState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    default:
      return state
  }
}

const dashboardCounts = {
  transactions: '',
  nft : "",
  collections : "",
  category : ""
}

const dashboardCount = (state = dashboardCounts, { type, ...payload }) => {
  switch (type) {
    case 'setCount':
      return { ...state, transactions: payload.transactions, nft: payload.nft, collections: payload.collections, category: payload.category, };
    default:
      return state
  }
}

const appReducer = combineReducers({
  changeState: changeState,
  persist : persist ,
  dashboardCount : dashboardCount
});

const rootReducer = (state, action) => appReducer(state, action);
const persistedReducer = persistReducer(persistConfig, rootReducer);


const configureStore = () => {
  // create redux store
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore