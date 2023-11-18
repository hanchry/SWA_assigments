import {User} from "../../types/User";
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';


import {AuthEnums} from "../enums/AuthEnums";


export const loginRequest = () => ({
    type: AuthEnums.LOGIN_REQUEST,
});
export const loginSuccess = (user: User) => ({
    type: AuthEnums.LOGIN_SUCCESS,
    payload: user,
});
export const loginFailure = (error: string) => ({
    type: AuthEnums.LOGIN_FAILURE,
    payload: error,
});
export const logoutRequest = () => ({
    type: AuthEnums.LOGOUT_REQUEST,
});
export const logoutSuccess = () => ({
    type: AuthEnums.LOGOUT_SUCCESS,
});
export const logoutFailure = (error: string) => ({
    type: AuthEnums.LOGOUT_FAILURE,
    payload: error,
});
export const registerRequest = () => ({
    type: AuthEnums.REGISTER_REQUEST,
});
export const registerSuccess = (user: User) => ({
    type: AuthEnums.REGISTER_SUCCESS,
    payload: user,
});
export const registerFailure = (error: string) => ({
    type: AuthEnums.REGISTER_FAILURE,
    payload: error,
});


export const login = createAsyncThunk(
    AuthEnums.LOGIN_REQUEST,
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
export const logout = createAsyncThunk(
    AuthEnums.LOGOUT_REQUEST,
    async (token:string,thunkAPI) => {
        thunkAPI.dispatch(logoutRequest());
        try {
            const response = await axios.post('http://localhost:9090/logout', null, {
                params: { token: token },
            });
            thunkAPI.dispatch(logoutSuccess());
            return {};
        } catch (error) {
            thunkAPI.dispatch(logoutFailure((error as Error).message));
            return thunkAPI.rejectWithValue({ error: (error as Error).message });
        }
    });
export const register = createAsyncThunk(
    AuthEnums.REGISTER_REQUEST,
    async (user: User, thunkAPI) => {
        thunkAPI.dispatch(registerRequest());
        try {
            const response = await axios.post('http://localhost:9090/users', user);
            thunkAPI.dispatch(registerSuccess(response.data));
            return response.data;
        } catch (error) {
            thunkAPI.dispatch(registerFailure((error as Error).message));
            return thunkAPI.rejectWithValue({ error: (error as Error).message });
        }
    });