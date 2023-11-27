import {ScoreEnums} from "../enums/ScoreEnums";
import {Score} from "../../types/Score";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {LoginState} from "../reducers/AuthReducer";
import axios from "axios";


export const getScoresRequest = () => ({
    type: ScoreEnums.GET_SCORES_REQUEST,
});
export const getScoresSuccess = (scores: Score) => ({
    type: ScoreEnums.GET_SCORES_SUCCESS,
    payload: scores,
});
export const getScoresFailure = (error: string) => ({
    type: ScoreEnums.GET_SCORES_FAILURE,
    payload: error,
});

export const getScores = createAsyncThunk(
    ScoreEnums.GET_SCORES_REQUEST,
    async (_, thunkAPI) => {
        thunkAPI.dispatch(getScoresRequest());
        const token = getTokenFromState(thunkAPI.getState());
        try {
            const url = `http://localhost:9090/games?token=${token}`;
            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                },
            });
            const userResponse = response.data;
            thunkAPI.dispatch(getScoresSuccess(userResponse));
            return userResponse;
        } catch (error) {
            thunkAPI.dispatch(getScoresFailure((error as Error).message));
            return thunkAPI.rejectWithValue({error: (error as Error).message});
        }
    }
);

const getTokenFromState = (state: any) => state.authReducer.token as string;
