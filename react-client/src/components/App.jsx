// Node modules
import React from 'react';
import styled from 'styled-components';

// Components
import MenuHeader from './menuComponents/MenuHeader.jsx'
import Button from './interactiveElements/Button.jsx';

// Functions
import incrementMoney from '../../utils/incrementMoney.js';

// Styled components
const ButtonContainer = styled.div`
    display: flex;
    flex-flow: column;
    position: absolute;
    top: 40vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const MoneyText = styled.div`
    font-size: 20px;
    font-family: sans-serif;
    user-select: none;
`;

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            money: 0,
            incrementAmount: 1
        }

        this.incrementMoney = incrementMoney.bind(this);
    }

    render() {
        return (
            <div>
                <MenuHeader />
                <ButtonContainer>
                    <MoneyText>
                        You have ${this.state.money}
                    </MoneyText>
                    <Button incrementMoney={this.incrementMoney}/>
                </ButtonContainer>
            </div>
        )
    }
}

export default App;