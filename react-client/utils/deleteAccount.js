export default function deleteAccount() {
    fetch(`/deleteAccount/${this.state.username}`)
        .catch(err => {
            if (err) throw err;
        });
}