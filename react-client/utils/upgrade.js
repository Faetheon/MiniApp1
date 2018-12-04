export default function upgrade() {
    const helpers = [++this.state.helpers[0]].concat(this.state.helpers.splice(1));
    this.setState({helpers: helpers});
    fetch(`/upgrade/${this.state.money - 100}/${helpers.join(', ')}/${this.state.username}`)
};