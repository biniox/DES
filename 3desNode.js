const fs = require('fs');


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
		let hex = Number(str.charCodeAt(n)).toString(16);
		if(hex.length < 2) hex = 0 + hex
		// console.log(hex)
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



 const generate_keys = (key) => {
    // Array to hold the 16 keys
    let round_keys = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
	// The PC1 table 
	const pc1 = [
	57,49,41,33,25,17,9, 
	1,58,50,42,34,26,18, 
	10,2,59,51,43,35,27, 
	19,11,3,60,52,44,36,		 
	63,55,47,39,31,23,15, 
	7,62,54,46,38,30,22, 
	14,6,61,53,45,37,29, 
	21,13,5,28,20,12,4 
    ];
	// The PC2 table
	const pc2 = [ 
	14,17,11,24,1,5, 
	3,28,15,6,21,10, 
	23,19,12,4,26,8, 
	16,7,27,20,13,2, 
	41,52,31,37,47,55, 
	30,40,51,45,33,48, 
	44,49,39,56,34,53, 
	46,42,50,36,29,32 
    ]; 
	let perm_key =""; 
	for(let i = 0; i < 56; i++) {
        perm_key+= key[pc1[i]-1]; 
    }

	let left = perm_key.substr(0, 28); 
	let right= perm_key.substr(28, 28); 

	for(let i=0; i<16; i++){ 
		if(i == 0 || i == 1 || i==8 || i==15 ){
			left = shift_left_once(left); 
			right = shift_left_once(right);
		} 
		else{
			left= shift_left_twice(left); 
			right= shift_left_twice(right);
		}
	let combined_key = left + right;
	let round_key = ""; 
	for(let i = 0; i < 48; i++) round_key += combined_key[pc2[i]-1]; 
    // //////debugger
	round_keys[i] = round_key;
	}
    
    return round_keys

}

const encrypt = (round_keys, pt) => { 
	let initial_permutation = [ 
	58,50,42,34,26,18,10,2, 
	60,52,44,36,28,20,12,4, 
	62,54,46,38,30,22,14,6, 
	64,56,48,40,32,24,16,8, 
	57,49,41,33,25,17,9,1, 
	59,51,43,35,27,19,11,3, 
	61,53,45,37,29,21,13,5, 
	63,55,47,39,31,23,15,7 
    ]; 
	let expansion_table = [ 
	32,1,2,3,4,5,4,5, 
	6,7,8,9,8,9,10,11, 
	12,13,12,13,14,15,16,17, 
	16,17,18,19,20,21,20,21, 
	22,23,24,25,24,25,26,27, 
	28,29,28,29,30,31,32,1 
    ]; 
	let substition_boxes =  
	[[
        14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7, 
        0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8, 
        4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0, 
        15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13 
    ], 
    [
        15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10, 
        3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5, 
        0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15, 
        13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9 
    ], 
    [ 
        10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8, 
        13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1, 
        13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7, 
        1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12 
    ], 
    [ 
        7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15, 
        13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9, 
        10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4, 
        3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14 
    ], 
    [ 
        2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9, 
        14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6, 
        4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14, 
        11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3 
    ], 
    [ 
        12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11, 
        10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8, 
        9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6, 
        4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13 
    ], 
    [ 
        4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1, 
        13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6, 
        1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2, 
        6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12 
    ], 
    [ 
        13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7, 
        1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2, 
        7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8, 
        2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11 
    ]];


	let permutation_tab  = [  
	16,7,20,21,29,12,28,17, 
	1,15,23,26,5,18,31,10, 
	2,8,24,14,32,27,3,9,
	19,13,30,6,22,11,4,25 
    ]; 
	let inverse_permutation = [  
	40,8,48,16,56,24,64,32, 
	39,7,47,15,55,23,63,31, 
	38,6,46,14,54,22,62,30, 
	37,5,45,13,53,21,61,29, 
	36,4,44,12,52,20,60,28, 
	35,3,43,11,51,19,59,27, 
	34,2,42,10,50,18,58,26, 
	33,1,41,9,49,17,57,25 
    ];


  	let perm = ""; 
	for(let i = 0; i < 64; i++){ 
		perm += pt[initial_permutation[i]-1]; 
	}  


	let left = perm.substr(0, 32); 
	let right = perm.substr(32, 32);



	for(let i=0; i<16; i++) { 
    	let right_expanded = ""; 
    	for(let i = 0; i < 48; i++) right_expanded += right[expansion_table[i]-1]; 

        // 3.3. The result is xored with a key
		let xored = Xor(round_keys[i], right_expanded);  
		let res = ""; 
		for(let i=0;i<8; i++){ 

      		let row1= xored.substr(i*6,1) + xored.substr(i*6 + 5,1);

      		let row = convertBinaryToDecimal(row1);

      		let col1 = xored.substr(i*6 + 1,1) + xored.substr(i*6 + 2,1) + xored.substr(i*6 + 3,1) + xored.substr(i*6 + 4,1);

			let col = convertBinaryToDecimal(col1);

			let val = substition_boxes[i][row*16 + col];

			res += convertDecimalToBinary(val);  

		} 
        //////debugger

		let perm2 =""; 
		for(let i = 0; i < 32; i++) {
            perm2 += res[permutation_tab[i]-1];

        }

		xored = Xor(perm2, left);

		left = xored; 
		if(i < 15){ 
			let temp = right;
			right = xored;
			left = temp;
		} 
	} 
	let combined_text = left + right;   
	let ciphertext =""; 
	for(let i = 0; i < 64; i++) ciphertext+= combined_text[inverse_permutation[i]-1]; 

	return ciphertext; 
}

const decrypt = (round_keys, pt) => {
	let i = 15;
	let j = 0;
	while(i > j) {
		let temp = round_keys[i];
		round_keys[i] = round_keys[j];
		round_keys[j] = temp;
		i--;
		j++;
	}
	
	return encrypt(round_keys, pt);
}


const encrypt3 = (key1, key2, key3, pt) => {
	return encrypt(key3, decrypt(key2, encrypt(key1, pt)));
}

const decrypt3 = (key1, key2, key3, pt) => {
	return decrypt(key1, encrypt(key2, decrypt(key3, pt)));
}



const encryptFromForm = (textInput, keyInput, keyInput2, keyInput3, textIsHex = true, keyisHex = true) => {

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
        toReturn += convertBinaryToHex(encrypt3(key_array, key_array2, key_array3, toAdd)); 
    }

    return toReturn;
}

const decryptFromForm = (textInput, keyInput, keyInput2, keyInput3, textIsHex = true, keyisHex = true) => {

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




let key1 = "", key2 = "", key3 = "";

for(let i = 0; i < 16; i++) 
key1 += (Math.floor(Math.random()*16)).toString(16).toUpperCase();
for(let i = 0; i < 16; i++) 
key2 += (Math.floor(Math.random()*16)).toString(16).toUpperCase();
for(let i = 0; i < 16; i++) 
key3 += (Math.floor(Math.random()*16)).toString(16).toUpperCase();

// console.log(fs.readFileSync('input.txt', 'utf8').toString())

const data = convertAciiToHex(fs.readFileSync('input.txt', 'utf8').toString());
// console.log('wejHex: ' + data); 
let start = Date.now();
console.log('Początek kodowania ' + start)
const encoded = convertHexToAscii(encryptFromForm(data, key1, key2, key3));

console.log('Czas kodowania ' + (Date.now() - start))
// console.log('wejZakodowane: ' + encoded);


fs.writeFileSync('outEncoded.txt', encoded, 'utf8')




const data1 = convertAciiToHex(fs.readFileSync('outEncoded.txt', 'utf8').toString());
// console.log('wejZakodowane: ' + data1); 

start = Date.now();
console.log('Początek dekodowania ' + start)

const decoded = convertHexToAscii(decryptFromForm(data1, key1, key2, key3));

console.log('Czas dekodowania ' + (Date.now() - start))



fs.writeFileSync('outDecoded.txt', decoded, 'utf8')

