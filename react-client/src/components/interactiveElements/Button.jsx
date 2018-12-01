import React from 'react';
import styled from 'styled-components';

const color1 = "#f74d4d";
const color2 = "#f86569";
const dropColor = "#e24f4f";

const ButtonCss = styled.div`
    width: 100px;
    height: 90px;
    line-height: 100px;
    text-align: center;
    cursor: pointer;
    border-radius: 50%;
    background:${color1};
    background-image: linear-gradient(${color1}, ${color2});
    box-shadow: 0 15px ${dropColor};
    transition: 0.1s all ease-out;
        &:active {
            box-shadow: 0 0 ${dropColor};
            transform: translate(0px, 15px);
        }
`;

const Button = ({ incrementMoney }) => (
    <ButtonCss onClick={incrementMoney}/>
);

export default Button;