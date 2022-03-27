const Xor = (a,b) => { 
	let result = ""; 
	let size = b.length;
	for(let i = 0; i < size; i++){ 
		if(a[i] != b[i]) result += "1"; 
		else result += "0"; 
	} 
	return result; 
} 


function convertDecimalToBinary(x, len = 4) {
    let bin = (x >>> 0).toString(2);
    for(let i = bin.length; i<len; i++) bin = "0" + bin;
    return bin;
}

function convertAsciToBinary(input) {
    let toReturn = "";
    for (let i = 0; i < input.length; i++) {
        let tmp = input[i].charCodeAt(0).toString(2);
        for(let i = tmp.length; i<8; i++) tmp = "0" + tmp;
        toReturn += tmp + " ";
    }

    return toReturn;
  }


  function hex2bin(hex){
    return (parseInt(hex, 16).toString(2)).padStart(4, '0');
}

  function convertHexToBinary(hex){
      let result = ""
      for(let i = 0; i< hex.length; i++) {
        result += hex2bin(hex[i]) 
      }
      return result;
}


const convertBinaryToDecimal = (binary) => {
    let decimal = 0;
	let counter = 0;
	let size = binary.length;
	for(let i = size-1; i >= 0; i--) {
    	if(binary[i] == '1') decimal += 2**counter;
    counter++;
	}
	return decimal;
}


const convertBinaryToHex = (binary) => {
    let tmp =  parseInt(binary.slice(0,32), 2).toString(16).toUpperCase();
    for(let i = tmp.length; i<8; i++) tmp = "0" + tmp;
    let tmp2 =  parseInt(binary.slice(32,64), 2).toString(16).toUpperCase();
    for(let i = tmp2.length; i<8; i++) tmp2 = "0" + tmp2;
    return tmp + tmp2;
};

const convertBinaryToChar = (binary) => String.fromCharCode(convertBinaryToDecimal(binary));

// Function to do a circular left shift by 1
const  shift_left_once = (key_chunk) => { 
    let shifted="";  
        for(let i = 1; i < 28; i++) shifted += key_chunk[i]; 
        shifted += key_chunk[0];   
    return shifted; 
} 


// Function to do a circular left shift by 2
const shift_left_twice = (key_chunk) => { 
    let shifted=""; 
    for(let i = 0; i < 2; i++){ 
        for(let j = 1; j < 28; j++)
            shifted += key_chunk[j]; 
        shifted += key_chunk[0]; 
        key_chunk = shifted; 
        shifted = ""; 
    } 
    return key_chunk; 
}

function convertAciiToHex(str)
  {
	const arr1 = [];
	for (let n = 0, l = str.length; n < l; n ++) 
     {
		const hex = Number(str.charCodeAt(n)).toString(16);
		arr1.push(hex);
	 }
	return arr1.join('').toUpperCase();
}


function convertHexToAscii(str1)
 {
	const hex  = str1.toString();
	let str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }



export { Xor, convertBinaryToDecimal, convertDecimalToBinary, shift_left_twice, shift_left_once, convertBinaryToChar, convertHexToBinary, convertAsciToBinary, convertBinaryToHex, convertAciiToHex, convertHexToAscii }