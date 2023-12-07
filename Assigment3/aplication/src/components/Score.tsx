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

    const topTen = (scores: Score[]) => {
        // const uniqueScores = scores.reduce((unique:Score[], score:Score) => {
        //     const existing = unique.find((s:Score) => s.user === score.user);
        //
        //     if (!existing) {
        //         unique.push(score);
        //     } else if (score.score > existing.score) {
        //         existing.score = score.score;
        //     }
        //
        //     return unique;
        // }, []);
        console.log(scores);

        const sortedScores = scores.sort((a, b) => b.score - a.score);

        return sortedScores.slice(0, 10);
    }
    const fetchBestScores = async () => {
        const response = await dispatch(getScores() as any);
        if (response.type === ScoreEnums.GET_SCORES_SUCCESS) {
            setBestScores(topTen(response.payload));
        }
    };

    useEffect(() => {
        fetchBestScores();
    }, []);

    return (
        <div id="best-scores">
            <h2 className="score-heading">Best Scores</h2>
            <table className="score-table">
                <thead>
                <tr>
                    <th className="table-header">Rank</th>
                    <th className="table-header">User</th>
                    <th className="table-header">Score</th>
                </tr>
                </thead>
                <tbody>
                {bestScores.map((score, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{score.user}</td>
                        <td>{score.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BestScores;
