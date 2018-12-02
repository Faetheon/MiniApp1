import encrypt from 'crypto-js';

export default function login(username, password) {
    if (username !== undefined && password !== undefined) {
        fetch(`/login/${username}/${encrypt.SHA256(password).toString()}`);
        this.setState({username: username});
    }
}