import { decrypt, encrypt, generate_keys } from './src/des.js';
import { convertHexToBinary, convertAsciToBinary, convertBinaryToHex } from './src/helpers.js';




const encodeForm = document.querySelector(".encode");
const decodeForm = document.querySelector(".decode");
const generateButton = document.querySelector(".encode_input--generate");

const handlerOnSubmit = (e, mode) => {
    // mode 1 - encrypt, 2 - decrypt
    e.preventDefault();

    let resultHtmlField, result;

    if(mode==1) {
        const textInput = document.getElementsByClassName("encode_input--text")[0].value;
        const keyInput = document.getElementsByClassName("encode_input--key")[0].value;
    
        const textIsHex = document.getElementsByClassName("encode_input--textIsHex")[0].checked;
        const keyisHex = document.getElementsByClassName("encode_input--keyIsHex")[0].checked;

        resultHtmlField = document.getElementsByClassName("encode_result--title")[0];
        result = "Zakodowany ciąg (HEX): " + encryptFromForm(textInput, keyInput, textIsHex, keyisHex);  
    } else {
        const textInput = document.getElementsByClassName("encode_input--text")[1].value;
        const keyInput = document.getElementsByClassName("encode_input--key")[1].value;
    
        const textIsHex = document.getElementsByClassName("encode_input--textIsHex")[1].checked;
        const keyisHex = document.getElementsByClassName("encode_input--keyIsHex")[1].checked;
        
        resultHtmlField = document.getElementsByClassName("encode_result--title")[1];
        result = "Zdekodowany ciąg (HEX): " + decryptFromForm(textInput, keyInput, textIsHex, keyisHex);
    }

    resultHtmlField.innerHTML = result;

}

encodeForm.addEventListener('submit', e => handlerOnSubmit(e, 1));
decodeForm.addEventListener('submit', e => handlerOnSubmit(e, 2));
generateButton.addEventListener('click', e => {
    let toReturn = "";
    for(let i = 0; i < 16; i++) 
        toReturn += (Math.floor(Math.random()*16)).toString(16).toUpperCase()
    let keyInput = document.getElementsByClassName("encode_input--key")[0];
    keyInput.value =  toReturn;
    keyInput = document.getElementsByClassName("encode_input--key")[1];
    keyInput.value =  toReturn;
});


const encryptFromForm = (textInput, keyInput, textIsHex, keyisHex) => {

    const byteLength = textIsHex ? 16 : 8;
    const key = keyisHex ? convertHexToBinary(keyInput) : convertAsciToBinary(keyInput);
    let toReturn = "";

    while(textInput) {
        let toAdd = textInput.slice(0, byteLength);
        textInput = textInput.slice(byteLength, textInput.length);

        toAdd = textIsHex ? convertHexToBinary(toAdd) : convertAsciToBinary(toAdd);

        const key_array = generate_keys(key); 
        toReturn += convertBinaryToHex(encrypt(key_array, toAdd)); 
    }

    return toReturn;
}

const decryptFromForm = (textInput, keyInput, textIsHex, keyisHex) => {

    const byteLength = textIsHex ? 16 : 8;
    const key = keyisHex ? convertHexToBinary(keyInput) : convertAsciToBinary(keyInput);
    let toReturn = "";

    while(textInput) {
        let toAdd = textInput.slice(0, byteLength);
        textInput = textInput.slice(byteLength, textInput.length);

        toAdd = textIsHex ? convertHexToBinary(toAdd) : convertAsciToBinary(toAdd);

        const key_array = generate_keys(key); 
        toReturn += convertBinaryToHex(decrypt(key_array, toAdd)); 
    }

    return toReturn;
}






