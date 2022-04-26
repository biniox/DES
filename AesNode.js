const fs = require('fs');
const CryptoJS = require("crypto-js");

const AES = require("crypto-js/aes");




const key = 'KluczPrzykladowy';
const data = fs.readFileSync('input.txt', 'utf8').toString();


let start = null;
let end = null;

//Encrypt
start = Date.now();
const ciphertext = CryptoJS.AES.encrypt(data, key).toString();
end = Date.now() - start;

console.log('Czas kodowania ' + end)

fs.writeFileSync('outEncoded.txt', ciphertext, 'utf8');


// Decrypt

const data1 = fs.readFileSync('outEncoded.txt', 'utf8').toString();

start = Date.now();
const bytes  = CryptoJS.AES.decrypt(data1, key);
end = Date.now() - start;
console.log('Czas kodowania ' + end)

const originalText = bytes.toString(CryptoJS.enc.Utf8);


// console.log(originalText); // 'my message'

fs.writeFileSync('outDecoded.txt', originalText, 'utf8')

