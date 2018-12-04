import encrypt from 'crypto-js';

export default function login(username, password) {
    if (username !== undefined && password !== undefined) {
        fetch(`/login/${username}/${encrypt.SHA256(password).toString()}`)
            .then(res => res.json())
            .then(res => {
                if (typeof res.score === 'number') {
                    const helpers = res.workers.split(',');
                    helpers.forEach((helper, i) => {
                        helpers[i] = Number(helper);
                        console.log(typeof helper, helper);
                    });
                    console.log(helpers);
                    this.setState({username: username, isLoggedIn: true, money: res.score, helpers: helpers, incrementAmount: helpers[0] + 1});
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