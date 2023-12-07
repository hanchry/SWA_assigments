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
export const postScoreSuccess = (score: Score) => ({
    type: ScoreEnums.POST_SCORE_SUCCESS,
    payload: score,
});
export const postScoreFailure = (error: string) => ({
    type: ScoreEnums.POST_SCORE_FAILURE,
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
export const postScore = createAsyncThunk(
    ScoreEnums.POST_SCORE_REQUEST,
    async (score: Score, thunkAPI) => {
        thunkAPI.dispatch(getScoresRequest());
        const token = getTokenFromState(thunkAPI.getState());
        const userId = getUserId(thunkAPI.getState());
        try {
            score.userId = userId

            const mappedScore = {
                user: score.userId,
                id: score.id,
                score: score.score,
                completed: false,
            }

            const url = `http://localhost:9090/games?token=${token}`;
            const response = await axios.post(url, mappedScore, {
                headers: {
                    Accept: 'application/json',
                },
            });
            console.log(response)
            const userResponse = response.data;
            thunkAPI.dispatch(postScoreSuccess(userResponse));
            return userResponse;
        }
        catch (error) {
            thunkAPI.dispatch(postScoreFailure((error as Error).message));
            return thunkAPI.rejectWithValue({error: (error as Error).message});
        }
    }
);

const getTokenFromState = (state: any) => state.authReducer.token as string;
const getUserId = (state: any) => state.authReducer.userId as number;
