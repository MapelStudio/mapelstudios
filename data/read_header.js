const fs = require('fs');
const b = fs.readFileSync('c:/Users/mohan/sample/mapelstudios/data/targets.mind');
const hex = b.slice(0, 50).toString('hex');
const str = b.slice(0, 50).toString('utf8');
fs.writeFileSync('c:/Users/mohan/sample/mapelstudios/data/header.txt', 'HEX: ' + hex + '\nSTR: ' + str);
