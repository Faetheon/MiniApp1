export default function updateScoreBoard() {
    fetch('/update')
        .then(res => res.json())
        .then(data => {
            const users = [];
            const scores = [];
           data[1].forEach(username => {
                users.push(username[0].username.replace(/\s/g, ''));
            });
            data[0].forEach(score => {
                scores.push(score);
            });

            this.setState({scoreBoardScores: scores, scoreBoardUsernames: users});
        });
};