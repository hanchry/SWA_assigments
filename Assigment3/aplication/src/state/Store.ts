import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./reducers/AuthReducer";
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        authReducer: authReducer,
    },
    middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export default store;
