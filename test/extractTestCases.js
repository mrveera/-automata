const testCases = require('./cases.json');
const template = require('./template.js');
let cases = testCases.filter((tc)=>tc.type==process.argv[2]);
cases.forEach((c)=>console.log(template(c)))
