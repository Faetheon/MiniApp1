// Node modules
import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

// Components
import MenuHeader from './menuComponents/MenuHeader.jsx'
import Button from './interactiveElements/Button.jsx';
import Login from './loginComponents/Login.jsx';

// Functions
import incrementMoney from '../../utils/incrementMoney.js';
import login from '../../utils/login.js';

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
            incrementAmount: 1,
            isLoggedIn: false
        }

        this.incrementMoney = incrementMoney.bind(this);
        this.login = login.bind(this);
    }

    render() {
        return (
            <Router>
                <Route path="/*" render={() => (
                    !this.isLoggedIn ? (
                        <Login login={this.login}/>
                    ) : (
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
                )} />
            </Router>
        )
    }
}

export default App;