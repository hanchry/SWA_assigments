import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./reducers/AuthReducer";
import thunk from 'redux-thunk';
import useReducer from "./reducers/UserReducer";
import scoreReducer from "./reducers/ScoreReducer";
import boardReducer from "./reducers/BoardReducer";

const store = configureStore({
    reducer: {
        authReducer: authReducer,
        userReducer: useReducer,
        scoreReducer: scoreReducer,
        boardReducer: boardReducer,
    },
    middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export default store;
