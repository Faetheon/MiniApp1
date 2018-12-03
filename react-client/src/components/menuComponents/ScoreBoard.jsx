import React from 'react';
import styled from 'styled-components';

import PlayerAttributes from './PlayerAttributes.jsx';

const Board = styled.div`
    display: flex;
    flex-flow: column;
    position: absolute;
    top: 5vh;
    left: 20px;
`;

const ScoreBoard = ({usernames, scores}) => (
    <Board>
        {usernames.map((username, i) => (
            <PlayerAttributes username={username} score={scores[i].score} high_score={scores[i].high_score} key={i}/>
        ))}
    </Board>
);

export default ScoreBoard;