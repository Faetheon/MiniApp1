// Node modules
import React from 'react';
import styled from 'styled-components';
import {BrowserRouter as Router, Route, Redirect, Link, Switch} from 'react-router-dom';

// Components
import MenuHeader from './menuComponents/MenuHeader.jsx'
import Button from './interactiveElements/Button.jsx';
import Login from './loginComponents/Login.jsx';
import ScoreBoard from './menuComponents/ScoreBoard.jsx';

// Functions
import incrementMoney from '../../utils/incrementMoney.js';
import login from '../../utils/login.js';
import updateScoreBoard from '../../utils/updateScoreBoard.js';
import deleteAccount from '../../utils/deleteAccount.js';

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
            scoreBoardUsernames: [],
            scoreBoardScores: []
        }

        this.incrementMoney = incrementMoney.bind(this);
        this.login = login.bind(this);
        this.updateScoreBoard = updateScoreBoard.bind(this);
        this.deleteAccount = deleteAccount.bind(this);
    }

    componentDidMount() {
            this.updateScoreBoard();
            setInterval(() => {
            this.updateScoreBoard();
        }, 20000);
    }

    render() {
        return (
            <Router>
                <div>
                    {this.state.isLoggedIn ?
                        <div>
                            <MenuHeader />
                            <ScoreBoard usernames={this.state.scoreBoardUsernames} scores={this.state.scoreBoardScores}/>
                            <ButtonContainer>
                                <MoneyText>
                                    You have ${this.state.money}
                                </MoneyText>
                                <Button incrementMoney={this.incrementMoney}/>
                                <button style={{marginTop: '30px'}} onClick={() => {this.deleteAccount(); this.setState({isLoggedIn: false, username: ''})}}>Delete Account</button>
                            </ButtonContainer>
                        </div>
                            :
                         <Login login={this.login} /> 
                    }
                </div>
            </Router>
        )
    }
}

export default App;