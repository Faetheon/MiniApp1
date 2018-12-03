import encrypt from 'crypto-js';

export default function login(username, password) {
    if (username !== undefined && password !== undefined) {
        fetch(`/login/${username}/${encrypt.SHA256(password).toString()}`)
            .then(res => res.json())
            .then(res => {
                if (/2..|3../.test(JSON.stringify(res.status)) || typeof res.score === 'number') {
                    this.setState({username: username, isLoggedIn: true, money: res.score});
                } else {
                    alert('Sorry that username is already taken.');
                }
            })
            .catch(err => {
                if (err) console.log(err);
            })
    }
}