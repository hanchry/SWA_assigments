import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./reducers/AuthReducer";
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        authReducer: loginReducer,
    },
    middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export default store;
