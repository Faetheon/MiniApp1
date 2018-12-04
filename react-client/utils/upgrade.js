export default function upgrade() {
    const helpers = [[++this.state.helpers[0]].concat(this.state.helpers.splice(1))];
    fetch(`/upgrade/${this.state.money}/${helpers.join(', ')}/${this.state.username}`)
};