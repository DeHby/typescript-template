// obfuscate.js
const fs = require('fs')
const JavaScriptObfuscator = require('javascript-obfuscator')

const input = fs.readFileSync('dist/app.js', 'utf8')

const output = JavaScriptObfuscator.obfuscate(input, {
    compact: true,
    log: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1,

    controlFlowFlattening: true,
    deadCodeInjection: true,
    stringArrayIndexShift: true,
    stringArrayShuffle: true,
    splitStrings: true,
    target: "node",
    numbersToExpressions: true,
    unicodeEscapeSequence: true,
    selfDefending: false
}).getObfuscatedCode()

fs.writeFileSync('dist/app.obf.js', output)
