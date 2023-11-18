import {User} from "../../types/User";
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

// Action types
import {LoginEnums} from "../enums/LoginEnums";

export const loginRequest = () => ({
    type: LoginEnums.LOGIN_REQUEST,
});
export const loginSuccess = (user: User) => ({
    type: LoginEnums.LOGIN_SUCCESS,
    payload: user,
});
export const loginFailure = (error: string) => ({
    type: LoginEnums.LOGIN_FAILURE,
    payload: error,
});

export const login = createAsyncThunk(
    LoginEnums.LOGIN_REQUEST,
    async (user: User, thunkAPI) => {
        thunkAPI.dispatch(loginRequest());
        try {
            const response = await axios.post('http://localhost:9090/login', user);
            thunkAPI.dispatch(loginSuccess(response.data));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(loginFailure((error as Error).message));
            return thunkAPI.rejectWithValue({ error: (error as Error).message });
        }
    }
);