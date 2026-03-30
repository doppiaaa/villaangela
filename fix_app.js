const fs = require('fs');
const lines = fs.readFileSync('/Users/andrea/Desktop/villaangela/src/App.tsx', 'utf8').split('\n');

// Line numbers are 1-indexed. remove 1026 to 1111 inclusive.
// Array splice is 0-indexed. 
// start index = 1025, count = 1111 - 1026 + 1 = 86
lines.splice(1025, 86);

fs.writeFileSync('/Users/andrea/Desktop/villaangela/src/App.tsx', lines.join('\n'));
console.log('File cleaned successfully');
