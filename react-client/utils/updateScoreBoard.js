export default function updateScoreBoard() {
    fetch('/update')
        .then(res => res.json())
        .then(data => {
            const users = [];
            const scores = [];
           data[0].forEach(username => {
                console.log(username);
                users.push(username.username.replace(/\s/g, ''));
            });
            data[1].forEach(score => {
                scores.push(score);
            });

            this.setState({scoreBoardScores: scores, scoreBoardUsernames: users});
        });
};