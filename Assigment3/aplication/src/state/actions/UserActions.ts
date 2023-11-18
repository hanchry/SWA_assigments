import {createAsyncThunk} from "@reduxjs/toolkit";

import {UserEnums} from "../enums/UserEnums";
import {User} from "../../types/User";
import axios from "axios";
import {useSelector} from "react-redux";
import {LoginState} from "../reducers/AuthReducer";

export const getUserRequest = () => ({
    type: UserEnums.GET_USER_REQUEST,
});
export const getUserSuccess = (user: User) => ({
    type: UserEnums.GET_USER_SUCCESS,
    payload: user,
});
export const getUserFailure = (error: string) => ({
    type: UserEnums.GET_USER_FAILURE,
    payload: error,
});

export const getUser = createAsyncThunk(
    UserEnums.GET_USER_REQUEST,
    async (user:User, thunkAPI) => {
        thunkAPI.dispatch(getUserRequest());
        try {
            const url = `http://localhost:9090/users/${user.id}?token=${user.token}`;
            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                },
            });

            const userResponse = response.data;
            thunkAPI.dispatch(getUserSuccess(userResponse));
            return userResponse;
        } catch (error) {
            thunkAPI.dispatch(getUserFailure((error as Error).message));
            return thunkAPI.rejectWithValue({ error: (error as Error).message });
        }
    });