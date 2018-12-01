import React from 'react';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            val: 1
        }
    }

    render() {
        return (
            <div>
                {this.state.val}
            </div>
        )
    }
}

export default App;