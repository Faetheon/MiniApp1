import encrypt from 'crypto-js';

export default function login(username, password) {
    if (username !== undefined && password !== undefined) {
        fetch(`/login/${username}/${encrypt.SHA256(password).toString()}`)
            .then(res => res.json())
            .then(res => {
                if (typeof res.score === 'number') {
                    this.setState({username: username, isLoggedIn: true, money: res.score});
                }
                if (res.nope) {
                    alert('Sorry that username is already taken');
                } else if (!res.nope) {
                    alert(`No account with that name found, created account ${username}.\nPlease login now.`);
                }
            })
            .catch(err => {
                if (err) throw err;
            });
    }
}