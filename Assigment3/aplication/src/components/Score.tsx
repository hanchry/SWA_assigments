import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getScores} from "../state/actions/ScoreActions";
import {ScoreEnums} from "../state/enums/ScoreEnums";
import {getUser} from "../state/actions/UserActions";
import {UserEnums} from "../state/enums/UserEnums";

// Define a type for a score object
type Score = {
    user: string;
    score: number;
};

const BestScores: React.FC = () => {
    const dispatch = useDispatch();

    const token = useSelector((state: any) => state.authReducer.token);

    const [bestScores, setBestScores] = useState<Score[]>([]);

    const fetchBestScores = async () => {
        const response = await dispatch(getScores() as any);
        if (response.type === ScoreEnums.GET_SCORES_SUCCESS) {
            for (let i = 0; i < response.payload.length; i++) {
                const userResponse = await dispatch(getUser({
                    id: response.payload[i].user,
                    username: "",
                    password: "",
                    token: token,
                    admin: false
                }) as any);
                if(userResponse.type === UserEnums.GET_USER_SUCCESS) {
                    response.payload[i].user = userResponse.payload.username;
                }
            }
            setBestScores(response.payload);
        }
    };

    useEffect(() => {
        fetchBestScores();
    }, []);

    return (
        <div>
            <h2>Best Scores</h2>
            <ol>
                {bestScores.map((score, index) => (
                    <li key={index}>
                        {score.user}: {score.score}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default BestScores;
