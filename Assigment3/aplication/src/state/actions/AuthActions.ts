import {User} from "../../types/User";
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

// Action types
import {LoginEnums} from "../enums/LoginEnums";


export const login = createAsyncThunk(
    LoginEnums.LOGIN_REQUEST,
    async (user: User, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:9090/login', user);
            console.log('Response for login: ', response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: (error as Error).message });
        }
    }
);