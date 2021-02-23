const callsites = require('callsites');

// Track jasmine suites and specs.
const suites = [];
const specs = [];

// @ts-ignore
global.jasmine.getEnv().addReporter({
  suiteStarted(suite) {
    suites.push(suite);
    // @ts-ignore
    global.jasmine.getEnv().currentSuite = { didFail: false, ...suite };
  },
  suiteDone: () => suites.pop(),
  specStarted: (spec) => specs.push(spec),
  specDone(currentSpec) {
    const didFail = currentSpec.failedExpectations.length > 0;
    // @ts-ignore
    global.jasmine.getEnv().currentSuite.didFail =
      global.jasmine.getEnv().currentSuite.didFail || didFail;
    specs.pop();
  },
});

function last(arr) {
  return arr[arr.length - 1];
}

// Helper to get the current spec's fullname, or in absense, the nearest
// suite.
function getSpecName() {
  const spec = last(specs);
  const suite = last(suites);
  if (spec) {
    return spec.fullName;
  } else if (suite) {
    return suite.description;
  }
  throw new Error('Not currently in a spec or a suite');
}

let currentTestFilename = '(unset)';

function getTestFilename() {
  return currentTestFilename;
}

// @ts-ignore
const actualDescribe = global.describe;

// @ts-ignore
global.describe = (description, tests) => {
  const caller = callsites()[1];
  currentTestFilename = caller.getFileName();
  return actualDescribe(description, tests);
};

module.exports = {
  getSpecName,
  getTestFilename,
};
