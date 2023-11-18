import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./reducers/AuthReducer";
import thunk from 'redux-thunk';
import useReducer from "./reducers/UserReducer";

const store = configureStore({
    reducer: {
        authReducer: authReducer,
        userReducer: useReducer,
    },
    middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export default store;
