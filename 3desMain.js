import { decrypt3, encrypt3, generate_keys } from './src/des.js';
import { convertHexToBinary, convertAsciToBinary, convertBinaryToHex, convertAciiToHex, convertHexToAscii } from './src/helpers.js';




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
        const keyInput2 = document.getElementsByClassName("encode_input--key2")[0].value;
        const keyInput3 = document.getElementsByClassName("encode_input--key3")[0].value;
    
        const textIsHex = document.getElementsByClassName("encode_input--textIsHex")[0].checked;
        const keyisHex = document.getElementsByClassName("encode_input--keyIsHex")[0].checked;

        resultHtmlField = document.getElementsByClassName("encode_result--title")[0];
        const encrypted = encryptFromForm(textInput, keyInput, keyInput2, keyInput3, textIsHex, keyisHex);
        result = "Zakodowany ciąg (HEX): " + encrypted;  

        savefile('output.txt', encrypted)
    } else {
        const textInput = document.getElementsByClassName("encode_input--text")[1].value;
        const keyInput = document.getElementsByClassName("encode_input--key")[1].value;
        const keyInput2 = document.getElementsByClassName("encode_input--key2")[1].value;
        const keyInput3 = document.getElementsByClassName("encode_input--key3")[1].value;
    
        const textIsHex = document.getElementsByClassName("encode_input--textIsHex")[1].checked;
        const keyisHex = document.getElementsByClassName("encode_input--keyIsHex")[1].checked;
        
        resultHtmlField = document.getElementsByClassName("encode_result--title")[1];
        const decoded = decryptFromForm(textInput, keyInput, keyInput2, keyInput3, textIsHex, keyisHex);
        result = "Zdekodowany ciąg (HEX): " + decoded;

        savefile('decoded.txt', decoded)
    }

    resultHtmlField.innerHTML = result;

}

encodeForm.addEventListener('submit', e => handlerOnSubmit(e, 1));
decodeForm.addEventListener('submit', e => handlerOnSubmit(e, 2));

generateButton.addEventListener('click', e => {
    let toReturn = "";
    let key1 = "";
    let key2 = "";
    let key3 = "";

    for(let i = 0; i < 16; i++) 
        key1 += (Math.floor(Math.random()*16)).toString(16).toUpperCase();
    for(let i = 0; i < 16; i++) 
        key2 += (Math.floor(Math.random()*16)).toString(16).toUpperCase();
    for(let i = 0; i < 16; i++) 
        key3 += (Math.floor(Math.random()*16)).toString(16).toUpperCase();

    let keyInput = document.getElementsByClassName("encode_input--key")[0];
    keyInput.value =  key1;
    keyInput = document.getElementsByClassName("encode_input--key")[1];
    keyInput.value =  key1;

    keyInput = document.getElementsByClassName("encode_input--key2")[0];
    keyInput.value =  key2;
    keyInput = document.getElementsByClassName("encode_input--key2")[1];
    keyInput.value =  key2;

    keyInput = document.getElementsByClassName("encode_input--key3")[0];
    keyInput.value =  key3;
    keyInput = document.getElementsByClassName("encode_input--key3")[1];
    keyInput.value =  key3;

});


const encryptFromForm = (textInput, keyInput, keyInput2, keyInput3, textIsHex, keyisHex) => {

    const byteLength = textIsHex ? 16 : 8;
    const key = keyisHex ? convertHexToBinary(keyInput) : convertAsciToBinary(keyInput);
    const key2 = keyisHex ? convertHexToBinary(keyInput2) : convertAsciToBinary(keyInput2);
    const key3 = keyisHex ? convertHexToBinary(keyInput3) : convertAsciToBinary(keyInput3);
    let toReturn = "";
    
    console.log(textInput, keyInput, keyInput2, keyInput3, textIsHex, keyisHex);

    while(textInput) {
        let toAdd = textInput.slice(0, byteLength);
        textInput = textInput.slice(byteLength, textInput.length);

        toAdd = textIsHex ? convertHexToBinary(toAdd) : convertAsciToBinary(toAdd);

        const key_array = generate_keys(key); 
        const key_array2 = generate_keys(key2); 
        const key_array3 = generate_keys(key3); 
        toReturn += convertBinaryToHex(encrypt3(key_array, key_array2, key_array3, toAdd)); 
    }

    return toReturn;
}

const decryptFromForm = (textInput, keyInput, keyInput2, keyInput3, textIsHex, keyisHex) => {

    const byteLength = textIsHex ? 16 : 8;
    const key = keyisHex ? convertHexToBinary(keyInput) : convertAsciToBinary(keyInput);
    const key2 = keyisHex ? convertHexToBinary(keyInput2) : convertAsciToBinary(keyInput2);
    const key3 = keyisHex ? convertHexToBinary(keyInput3) : convertAsciToBinary(keyInput3);

    let toReturn = "";

    while(textInput) {
        let toAdd = textInput.slice(0, byteLength);
        textInput = textInput.slice(byteLength, textInput.length);
        toAdd = textIsHex ? convertHexToBinary(toAdd) : convertAsciToBinary(toAdd);

        const key_array = generate_keys(key); 
        const key_array2 = generate_keys(key2); 
        const key_array3 = generate_keys(key3); 

        toReturn += convertBinaryToHex(decrypt3(key_array, key_array2, key_array3, toAdd)); 
    }

    return toReturn;
}


const readFileEncode = e => {
    console.log(e)
    const fr=new FileReader();
    fr.onload= () => {
        document.getElementsByClassName("encode_input--text")[0].value = convertAciiToHex(fr.result);
    }
      
    fr.readAsText(e.target.files[0]);

}

const readFileDecode = e => {
    console.log(e)
    const fr=new FileReader();
    fr.onload= () => {
        document.getElementsByClassName("encode_input--text")[1].value = convertAciiToHex(fr.result);
    }
      
    fr.readAsText(e.target.files[0]);

}

const savefile = (title, data) => {
    data = new Blob([convertHexToAscii(data)], {type: 'text/plain'});
    const link = document.createElement('a');
    link.setAttribute('download', title);
    link.setAttribute('href', URL.createObjectURL(data) );
    link.click();
}

document.getElementById('fileEncode').addEventListener('change', readFileEncode)
document.getElementById('fileDecode').addEventListener('change', readFileDecode)






