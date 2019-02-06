class NFA {
  constructor(tuple) {
    this.tuple = tuple;
    this._states = [];
  }
  hasEpsilon(state) {
    return Object.keys(this.tuple.delta[state] ? this.tuple.delta[state] : {}).includes("e");
  }
  transition(state, char) {
    let deltaForState = this.tuple.delta[state];
    return deltaForState ? (deltaForState[char] ? deltaForState[char] : []) : [];
  }
  pursueEpsilons() {
    let statesWithEpsilon = this._states.filter((s) => this.hasEpsilon(s));
    let statesAfterPursuingEpsilons = statesWithEpsilon.flatMap(s => this.transition(s, 'e'));
    let newStates = statesAfterPursuingEpsilons.filter((s) => !this._states.includes(s));
    if (!newStates.length) return;
    this._states.push(...newStates);
    return this.pursueEpsilons();
  }
  purseInput(char) {
    this._states = this._states.flatMap(s => this.transition(s, char));
  }
  doesAccept(language) {
    this._states = [this.tuple['start-state']];
    this.pursueEpsilons();
    let characters = language.split("");
    characters.forEach((char) => {
      this.purseInput(char);
      this.pursueEpsilons();
    });
    return this._states.some((machine) => this.tuple['final-states'].includes(machine));
  }
}

module.exports = NFA;
