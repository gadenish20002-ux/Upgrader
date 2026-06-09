const defaultState = { inventory: [1, 2, 3] };
const serverState1 = { inventory: undefined };
const serverState2 = {};

console.log("With undefined:", { ...defaultState, ...serverState1 }.inventory);
console.log("With missing:", { ...defaultState, ...serverState2 }.inventory);
