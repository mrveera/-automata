
let tuple = {
  states: ['q1', 'q2'],
  alphabets: ['1', '0'],
  delta: { q1: { '0': 'q2', '1': 'q1' }, q2: { '0': 'q1', '1': 'q2' } },
  'start-state': 'q1',
  'final-states': ['q2']
};

const machine = new DFA(tuple);
machine.doesAccept('0'); //returns true
machine.doesAccept('00'); //returns false
machine.doesAccept('000'); //returns true
machine.doesAccept('0000'); //returns false

const nfaTuple = {
  states: ['q1', 'q3', 'q7', 'q2', 'q5', 'q6', 'q4'],
  alphabets: ['1', '0'],
  delta: {
    q1: { e: ['q2', 'q5'] },
    q2: { '0': ['q3'] },
    q3: { '1': ['q4'] },
    q4: { '0': ['q3'] },
    q5: { '1': ['q6'] },
    q6: { '0': ['q7'] },
    q7: { '1': ['q6'] }
  },
  'start-state': 'q1',
  'final-states': ['q3', 'q6']
};

const machine = new NFA(nfaTuple);
machine.doesAccept('0'); //returns true
machine.doesAccept('10'); //returns false
