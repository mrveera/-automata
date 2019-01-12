const assert = require('chai').assert;
const DFA = require('../src/dfa');

describe("odd number of zeroes", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q2"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "0": "q2",
          "1": "q1"
        },
        "q2": {
          "0": "q1",
          "1": "q2"
        }
      },
      "start-state": "q1",
      "final-states": [
        "q2"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new DFA(tuple);
    assert.isOk(machine.doesAccept('0'));
    assert.isOk(machine.doesAccept('000'));
    assert.isOk(machine.doesAccept('00000'));
    assert.isOk(machine.doesAccept('10'));
    assert.isOk(machine.doesAccept('101010'));
    assert.isOk(machine.doesAccept('010101'));

  })
  it("fail-cases", function() {
    let machine = new DFA(tuple);
    assert.isNotOk(machine.doesAccept('00'));
    assert.isNotOk(machine.doesAccept('0000'));
    assert.isNotOk(machine.doesAccept('1001'));
    assert.isNotOk(machine.doesAccept('1010'));
    assert.isNotOk(machine.doesAccept('001100'));

  })
});

describe("even number of zeroes", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q2"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "0": "q2",
          "1": "q1"
        },
        "q2": {
          "0": "q1",
          "1": "q2"
        }
      },
      "start-state": "q1",
      "final-states": [
        "q1"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new DFA(tuple);
    assert.isOk(machine.doesAccept('00'));
    assert.isOk(machine.doesAccept('0000'));
    assert.isOk(machine.doesAccept('1001'));
    assert.isOk(machine.doesAccept('1010'));
    assert.isOk(machine.doesAccept('001100'));

  })
  it("fail-cases", function() {
    let machine = new DFA(tuple);
    assert.isNotOk(machine.doesAccept('0'));
    assert.isNotOk(machine.doesAccept('000'));
    assert.isNotOk(machine.doesAccept('00000'));
    assert.isNotOk(machine.doesAccept('10'));
    assert.isNotOk(machine.doesAccept('101010'));
    assert.isNotOk(machine.doesAccept('010101'));

  })
});

describe("at least one zero", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q2"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "0": "q2",
          "1": "q1"
        },
        "q2": {
          "0": "q2",
          "1": "q2"
        }
      },
      "start-state": "q1",
      "final-states": [
        "q2"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new DFA(tuple);
    assert.isOk(machine.doesAccept('0'));
    assert.isOk(machine.doesAccept('10'));
    assert.isOk(machine.doesAccept('100'));
    assert.isOk(machine.doesAccept('1100'));
    assert.isOk(machine.doesAccept('01'));
    assert.isOk(machine.doesAccept('010'));

  })
  it("fail-cases", function() {
    let machine = new DFA(tuple);
    assert.isNotOk(machine.doesAccept(''));
    assert.isNotOk(machine.doesAccept('1'));
    assert.isNotOk(machine.doesAccept('11'));
    assert.isNotOk(machine.doesAccept('111'));

  })
});

describe("at least one one", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q2"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "0": "q1",
          "1": "q2"
        },
        "q2": {
          "0": "q2",
          "1": "q2"
        }
      },
      "start-state": "q1",
      "final-states": [
        "q2"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new DFA(tuple);
    assert.isOk(machine.doesAccept('1'));
    assert.isOk(machine.doesAccept('10'));
    assert.isOk(machine.doesAccept('100'));
    assert.isOk(machine.doesAccept('1100'));
    assert.isOk(machine.doesAccept('01'));
    assert.isOk(machine.doesAccept('010'));

  })
  it("fail-cases", function() {
    let machine = new DFA(tuple);
    assert.isNotOk(machine.doesAccept(''));
    assert.isNotOk(machine.doesAccept('0'));
    assert.isNotOk(machine.doesAccept('00'));
    assert.isNotOk(machine.doesAccept('000'));

  })
});

describe("string length multiple of three", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q3",
        "q2"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "0": "q2",
          "1": "q2"
        },
        "q2": {
          "0": "q3",
          "1": "q3"
        },
        "q3": {
          "0": "q1",
          "1": "q1"
        }
      },
      "start-state": "q1",
      "final-states": [
        "q1"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new DFA(tuple);
    assert.isOk(machine.doesAccept('000'));
    assert.isOk(machine.doesAccept('111'));
    assert.isOk(machine.doesAccept('010'));
    assert.isOk(machine.doesAccept('101'));
    assert.isOk(machine.doesAccept('111111'));
    assert.isOk(machine.doesAccept('000000'));
    assert.isOk(machine.doesAccept('101010'));
    assert.isOk(machine.doesAccept('010101'));

  })
  it("fail-cases", function() {
    let machine = new DFA(tuple);
    assert.isNotOk(machine.doesAccept('00'));
    assert.isNotOk(machine.doesAccept('11'));
    assert.isNotOk(machine.doesAccept('10'));
    assert.isNotOk(machine.doesAccept('01'));
    assert.isNotOk(machine.doesAccept('11111'));
    assert.isNotOk(machine.doesAccept('00000'));
    assert.isNotOk(machine.doesAccept('01010'));
    assert.isNotOk(machine.doesAccept('10101'));

  })
});

describe("alternate ones and zeroes beginning with zero", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q3",
        "q2",
        "q4"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "0": "q2",
          "1": "q4"
        },
        "q2": {
          "0": "q4",
          "1": "q3"
        },
        "q3": {
          "0": "q2",
          "1": "q4"
        },
        "q4": {
          "0": "q4",
          "1": "q4"
        }
      },
      "start-state": "q1",
      "final-states": [
        "q3",
        "q2"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new DFA(tuple);
    assert.isOk(machine.doesAccept('0'));
    assert.isOk(machine.doesAccept('01'));
    assert.isOk(machine.doesAccept('010'));
    assert.isOk(machine.doesAccept('0101'));
    assert.isOk(machine.doesAccept('01010'));
    assert.isOk(machine.doesAccept('010101'));

  })
  it("fail-cases", function() {
    let machine = new DFA(tuple);
    assert.isNotOk(machine.doesAccept(''));
    assert.isNotOk(machine.doesAccept('1'));
    assert.isNotOk(machine.doesAccept('10'));
    assert.isNotOk(machine.doesAccept('101'));
    assert.isNotOk(machine.doesAccept('11'));
    assert.isNotOk(machine.doesAccept('00'));
    assert.isNotOk(machine.doesAccept('0100'));
    assert.isNotOk(machine.doesAccept('011'));

  })
});
