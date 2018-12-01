import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    height: 50px;
    background-image: linear-gradient(grey, white);
`;

class MenuHeader extends React.Component {
    constructor() {
        super();

        this.state = {
            val: 1
        }
    }

    render() {
        return (
            <Header>
                Hello World!
            </Header>
        );
    }
}

export default MenuHeader;