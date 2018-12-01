export default function incrementMoney() {
    this.setState({money: this.state.money + this.state.incrementAmount});
    fetch(`/${this.state.incrementAmount}`);
}