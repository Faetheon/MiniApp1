import React from 'react';
import styled from 'styled-components';


const Form = styled.form`
    display: flex;
    position: absolute;
    top: 30vh;
    flex-flow: column;
    width: 100vw;
    justify-content: center;
    align-items: center;
`;

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = { val: 1 };
    }

    render() {
        return (
            <Form onSubmit={(e) => {e.preventDefault(); this.props.login(e.target.username.value, e.target.password.value)}}>
                <input type='text' name='username' style={{marginTop: "15px"}} placeholder="Username"/>
                <input type='text' name='password' style={{marginTop: "15px"}} placeholder="Password"/>
                <input type="Submit" style={{marginTop: "15px"}}/>
            </Form>
        );
    }
}

export default Login;