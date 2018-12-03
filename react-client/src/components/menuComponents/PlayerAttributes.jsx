import React from 'react';
import styled from 'styled-components';

const Entry = styled.div` 
    display: flex;
    flex-flow: row;
`;

const PlayerAttributes = ({username, high_score, score}) => (
    <Entry>
        <div><span style={{fontSize: '25px', fontWeight: 'bold'}}>{username}</span>{`\tHigh Score: ${high_score}\tCurrent Score: ${score}`}</div>
    </Entry>
);

export default PlayerAttributes;