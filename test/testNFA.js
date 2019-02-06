const assert = require('chai').assert;
const NFA = require('../src/nfa');

describe("alternate characters beginning and ending with same letter", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q3",
        "q7",
        "q2",
        "q5",
        "q6",
        "q4"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "e": [
            "q2",
            "q5"
          ]
        },
        "q2": {
          "0": [
            "q3"
          ]
        },
        "q3": {
          "1": [
            "q4"
          ]
        },
        "q4": {
          "0": [
            "q3"
          ]
        },
        "q5": {
          "1": [
            "q6"
          ]
        },
        "q6": {
          "0": [
            "q7"
          ]
        },
        "q7": {
          "1": [
            "q6"
          ]
        }
      },
      "start-state": "q1",
      "final-states": [
        "q3",
        "q6"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new NFA(tuple);
    assert.isOk(machine.doesAccept('0'));
    assert.isOk(machine.doesAccept('010'));
    assert.isOk(machine.doesAccept('01010'));
    assert.isOk(machine.doesAccept('1'));
    assert.isOk(machine.doesAccept('101'));
    assert.isOk(machine.doesAccept('10101'));

  })
  it("fail-cases", function() {
    let machine = new NFA(tuple);
    assert.isNotOk(machine.doesAccept(''));
    assert.isNotOk(machine.doesAccept('10'));
    assert.isNotOk(machine.doesAccept('01'));
    assert.isNotOk(machine.doesAccept('11'));
    assert.isNotOk(machine.doesAccept('00'));
    assert.isNotOk(machine.doesAccept('001'));
    assert.isNotOk(machine.doesAccept('100'));
    assert.isNotOk(machine.doesAccept('1100'));

  })
});

describe("either even number of zeroes or even number of ones", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q3",
        "q2",
        "q5",
        "q4"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "e": [
            "q2",
            "q4"
          ]
        },
        "q2": {
          "0": [
            "q3"
          ],
          "1": [
            "q2"
          ]
        },
        "q3": {
          "0": [
            "q2"
          ],
          "1": [
            "q3"
          ]
        },
        "q4": {
          "0": [
            "q4"
          ],
          "1": [
            "q5"
          ]
        },
        "q5": {
          "0": [
            "q5"
          ],
          "1": [
            "q4"
          ]
        }
      },
      "start-state": "q1",
      "final-states": [
        "q2",
        "q4"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new NFA(tuple);
    assert.isOk(machine.doesAccept('00'));
    assert.isOk(machine.doesAccept('0000'));
    assert.isOk(machine.doesAccept('0101010'));
    assert.isOk(machine.doesAccept('00010'));
    assert.isOk(machine.doesAccept('11'));
    assert.isOk(machine.doesAccept('1111'));
    assert.isOk(machine.doesAccept('110101'));
    assert.isOk(machine.doesAccept('10101010'));

  })
  it("fail-cases", function() {
    let machine = new NFA(tuple);
    assert.isNotOk(machine.doesAccept('0001'));
    assert.isNotOk(machine.doesAccept('1110'));
    assert.isNotOk(machine.doesAccept('111000'));
    assert.isNotOk(machine.doesAccept('01'));
    assert.isNotOk(machine.doesAccept('10'));
    assert.isNotOk(machine.doesAccept('000111'));

  })
});

describe("sparse zero sandwich - any number of 1s with utmost one zero", function() {
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
          "0": [
            "q2"
          ],
          "1": [
            "q1"
          ],
          "e": [
            "q2"
          ]
        },
        "q2": {
          "1": [
            "q2"
          ]
        }
      },
      "start-state": "q1",
      "final-states": [
        "q2"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new NFA(tuple);
    assert.isOk(machine.doesAccept('1'));
    assert.isOk(machine.doesAccept('11'));
    assert.isOk(machine.doesAccept('101'));
    assert.isOk(machine.doesAccept('110'));
    assert.isOk(machine.doesAccept('01'));
    assert.isOk(machine.doesAccept('011'));
    assert.isOk(machine.doesAccept('1111'));

  })
  it("fail-cases", function() {
    let machine = new NFA(tuple);
    assert.isNotOk(machine.doesAccept('00'));
    assert.isNotOk(machine.doesAccept('010'));
    assert.isNotOk(machine.doesAccept('100'));
    assert.isNotOk(machine.doesAccept('110011'));
    assert.isNotOk(machine.doesAccept('1010'));

  })
});

describe("any number of zeroes followed by any number of ones", function() {
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
          "0": [
            "q1"
          ],
          "e": [
            "q2"
          ]
        },
        "q2": {
          "1": [
            "q2"
          ]
        }
      },
      "start-state": "q1",
      "final-states": [
        "q2"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new NFA(tuple);
    assert.isOk(machine.doesAccept(''));
    assert.isOk(machine.doesAccept('0'));
    assert.isOk(machine.doesAccept('1'));
    assert.isOk(machine.doesAccept('00'));
    assert.isOk(machine.doesAccept('001'));
    assert.isOk(machine.doesAccept('0011'));
    assert.isOk(machine.doesAccept('0001'));
    assert.isOk(machine.doesAccept('011'));
    assert.isOk(machine.doesAccept('000111'));

  })
  it("fail-cases", function() {
    let machine = new NFA(tuple);
    assert.isNotOk(machine.doesAccept('10'));
    assert.isNotOk(machine.doesAccept('1110'));
    assert.isNotOk(machine.doesAccept('010'));
    assert.isNotOk(machine.doesAccept('10101'));
    assert.isNotOk(machine.doesAccept('1101'));

  })
});

describe("0*1* or 1*0*", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q3",
        "q2",
        "q5",
        "q4"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "e": [
            "q2",
            "q4"
          ]
        },
        "q2": {
          "0": [
            "q2"
          ],
          "e": [
            "q3"
          ]
        },
        "q3": {
          "1": [
            "q3"
          ]
        },
        "q4": {
          "1": [
            "q4"
          ],
          "e": [
            "q5"
          ]
        },
        "q5": {
          "0": [
            "q5"
          ]
        }
      },
      "start-state": "q1",
      "final-states": [
        "q3",
        "q5"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new NFA(tuple);
    assert.isOk(machine.doesAccept(''));
    assert.isOk(machine.doesAccept('0'));
    assert.isOk(machine.doesAccept('1'));
    assert.isOk(machine.doesAccept('00'));
    assert.isOk(machine.doesAccept('11'));
    assert.isOk(machine.doesAccept('001'));
    assert.isOk(machine.doesAccept('110'));
    assert.isOk(machine.doesAccept('011'));
    assert.isOk(machine.doesAccept('100'));
    assert.isOk(machine.doesAccept('0011'));
    assert.isOk(machine.doesAccept('1100'));

  })
  it("fail-cases", function() {
    let machine = new NFA(tuple);
    assert.isNotOk(machine.doesAccept('101'));
    assert.isNotOk(machine.doesAccept('010'));
    assert.isNotOk(machine.doesAccept('11001'));
    assert.isNotOk(machine.doesAccept('00110'));
    assert.isNotOk(machine.doesAccept('0101'));
    assert.isNotOk(machine.doesAccept('1010'));

  })
});


describe("0*1* or 1*0* with extra epsilons", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q3",
        "q7",
        "q2",
        "q5",
        "q6",
        "q4"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "e": [
            "q2",
            "q4"
          ]
        },
        "q2": {
          "0": [
            "q2"
          ],
          "e": [
            "q3"
          ]
        },
        "q3": {
          "1": [
            "q3"
          ],
          "e": [
            "q6"
          ]
        },
        "q4": {
          "1": [
            "q4"
          ],
          "e": [
            "q5"
          ]
        },
        "q5": {
          "0": [
            "q5"
          ],
          "e": [
            "q7"
          ]
        }
      },
      "start-state": "q1",
      "final-states": [
        "q7",
        "q6"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new NFA(tuple);
    assert.isOk(machine.doesAccept(''));
    assert.isOk(machine.doesAccept('0'));
    assert.isOk(machine.doesAccept('1'));
    assert.isOk(machine.doesAccept('00'));
    assert.isOk(machine.doesAccept('11'));
    assert.isOk(machine.doesAccept('001'));
    assert.isOk(machine.doesAccept('110'));
    assert.isOk(machine.doesAccept('011'));
    assert.isOk(machine.doesAccept('100'));
    assert.isOk(machine.doesAccept('0011'));
    assert.isOk(machine.doesAccept('1100'));

  })
  it("fail-cases", function() {
    let machine = new NFA(tuple);
    assert.isNotOk(machine.doesAccept('101'));
    assert.isNotOk(machine.doesAccept('010'));
    assert.isNotOk(machine.doesAccept('11001'));
    assert.isNotOk(machine.doesAccept('00110'));
    assert.isNotOk(machine.doesAccept('0101'));
    assert.isNotOk(machine.doesAccept('1010'));

  })
});

describe("001* or 101*", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q3",
        "q7",
        "q2",
        "q8",
        "q5",
        "q6",
        "q4"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "e": [
            "q2",
            "q5"
          ]
        },
        "q2": {
          "0": [
            "q3"
          ]
        },
        "q3": {
          "0": [
            "q4"
          ]
        },
        "q4": {
          "e": [
            "q8"
          ]
        },
        "q5": {
          "1": [
            "q6"
          ]
        },
        "q6": {
          "0": [
            "q7"
          ]
        },
        "q7": {
          "e": [
            "q8"
          ]
        },
        "q8": {
          "1": [
            "q8"
          ]
        }
      },
      "start-state": "q1",
      "final-states": [
        "q8"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new NFA(tuple);
    assert.isOk(machine.doesAccept('00'));
    assert.isOk(machine.doesAccept('10'));
    assert.isOk(machine.doesAccept('001'));
    assert.isOk(machine.doesAccept('101'));
    assert.isOk(machine.doesAccept('0011'));
    assert.isOk(machine.doesAccept('1011'));

  })
  it("fail-cases", function() {
    let machine = new NFA(tuple);
    assert.isNotOk(machine.doesAccept(''));
    assert.isNotOk(machine.doesAccept('1'));
    assert.isNotOk(machine.doesAccept('0'));
    assert.isNotOk(machine.doesAccept('11'));
    assert.isNotOk(machine.doesAccept('01'));
    assert.isNotOk(machine.doesAccept('0010'));
    assert.isNotOk(machine.doesAccept('1010'));
    assert.isNotOk(machine.doesAccept('00110'));
    assert.isNotOk(machine.doesAccept('10110'));

  })
});

describe("(000)* U 1(01)*", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q11",
        "q1",
        "q3",
        "q12",
        "q14",
        "q9",
        "q7",
        "q2",
        "q8",
        "q13",
        "q5",
        "q10",
        "q6",
        "q4",
        "q15"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q11": {
          "e": [
            "q12"
          ]
        },
        "q1": {
          "e": [
            "q9",
            "q2"
          ]
        },
        "q3": {
          "0": [
            "q4"
          ]
        },
        "q12": {
          "0": [
            "q13"
          ]
        },
        "q14": {
          "1": [
            "q15"
          ]
        },
        "q9": {
          "1": [
            "q10"
          ]
        },
        "q7": {
          "0": [
            "q8"
          ]
        },
        "q2": {
          "e": [
            "q3"
          ]
        },
        "q8": {
          "e": [
            "q3"
          ]
        },
        "q13": {
          "e": [
            "q14"
          ]
        },
        "q5": {
          "0": [
            "q6"
          ]
        },
        "q10": {
          "e": [
            "q11"
          ]
        },
        "q6": {
          "e": [
            "q7"
          ]
        },
        "q4": {
          "e": [
            "q5"
          ]
        },
        "q15": {
          "e": [
            "q12"
          ]
        }
      },
      "start-state": "q1",
      "final-states": [
        "q11",
        "q2",
        "q8",
        "q15"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new NFA(tuple);
    assert.isOk(machine.doesAccept(''));
    assert.isOk(machine.doesAccept('1'));
    assert.isOk(machine.doesAccept('000'));
    assert.isOk(machine.doesAccept('000000'));
    assert.isOk(machine.doesAccept('101'));
    assert.isOk(machine.doesAccept('1010101'));

  })
  it("fail-cases", function() {
    let machine = new NFA(tuple);
    assert.isNotOk(machine.doesAccept('0'));
    assert.isNotOk(machine.doesAccept('0000'));
    assert.isNotOk(machine.doesAccept('1010'));
    assert.isNotOk(machine.doesAccept('00001'));
    assert.isNotOk(machine.doesAccept('0001'));

  })
});

describe("[10] U ({0*1*} U {1*0*}) )", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q3",
        "q2",
        "q5",
        "q6",
        "q4"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "0": [
            "q2",
            "q4"
          ],
          "1": [
            "q2",
            "q4"
          ]
        },
        "q2": {
          "0": [
            "q2"
          ],
          "e": [
            "q3"
          ]
        },
        "q3": {
          "1": [
            "q3"
          ],
          "e": [
            "q6"
          ]
        },
        "q4": {
          "1": [
            "q4"
          ],
          "e": [
            "q5"
          ]
        },
        "q5": {
          "0": [
            "q5"
          ],
          "e": [
            "q6"
          ]
        }
      },
      "start-state": "q1",
      "final-states": [
        "q6"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new NFA(tuple);
    assert.isOk(machine.doesAccept('1'));
    assert.isOk(machine.doesAccept('0'));
    assert.isOk(machine.doesAccept('10'));
    assert.isOk(machine.doesAccept('11'));
    assert.isOk(machine.doesAccept('01'));
    assert.isOk(machine.doesAccept('00'));
    assert.isOk(machine.doesAccept('101'));
    assert.isOk(machine.doesAccept('1001'));
    assert.isOk(machine.doesAccept('1011'));
    assert.isOk(machine.doesAccept('10011'));
    assert.isOk(machine.doesAccept('010'));
    assert.isOk(machine.doesAccept('0110'));
    assert.isOk(machine.doesAccept('0100'));
    assert.isOk(machine.doesAccept('01100'));

  })
  it("fail-cases", function() {
    let machine = new NFA(tuple);
    assert.isNotOk(machine.doesAccept(''));
    assert.isNotOk(machine.doesAccept('1010'));
    assert.isNotOk(machine.doesAccept('0101'));
    assert.isNotOk(machine.doesAccept('001100'));
    assert.isNotOk(machine.doesAccept('110010'));

  })
});


describe("(01)*(10)* U 11*", function() {
  beforeEach(function() {
    tuple = {
      "states": [
        "q1",
        "q3",
        "q9",
        "q7",
        "q2",
        "q8",
        "q5",
        "q6",
        "q4"
      ],
      "alphabets": [
        "1",
        "0"
      ],
      "delta": {
        "q1": {
          "e": [
            "q2",
            "q4"
          ]
        },
        "q3": {
          "0": [
            "q3"
          ]
        },
        "q9": {
          "e": [
            "q7"
          ]
        },
        "q7": {
          "1": [
            "q8"
          ],
          "e": [
            "q9"
          ]
        },
        "q2": {
          "0": [
            "q3"
          ]
        },
        "q8": {
          "0": [
            "q9"
          ]
        },
        "q5": {
          "1": [
            "q6"
          ]
        },
        "q6": {
          "e": [
            "q7",
            "q4"
          ]
        },
        "q4": {
          "0": [
            "q5"
          ],
          "e": [
            "q6"
          ]
        }
      },
      "start-state": "q1",
      "final-states": [
        "q3",
        "q9",
        "q6"
      ]
    };
  });

  it("pass-cases", function() {
    let machine = new NFA(tuple);
    assert.isOk(machine.doesAccept('0'));
    assert.isOk(machine.doesAccept('000'));
    assert.isOk(machine.doesAccept('01'));
    assert.isOk(machine.doesAccept('10'));
    assert.isOk(machine.doesAccept('0110'));

  })
  it("fail-cases", function() {
    let machine = new NFA(tuple);
    assert.isNotOk(machine.doesAccept('1'));
    assert.isNotOk(machine.doesAccept('11'));
    assert.isNotOk(machine.doesAccept('111'));
    assert.isNotOk(machine.doesAccept('1101'));
    assert.isNotOk(machine.doesAccept('0111'));

  })
});
