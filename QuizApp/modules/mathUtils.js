// Random real values in a specific range
/**
 * 
 * @param {Number} a 
 * @param {Number} b  
 * @returns Number
 */
export function rRealValue(a,b){

    return Math.random() * (b - a) + a;
}



// Random integers in a specific range
/**
 * 
 * @param {Number} a 
 * @returns Number
 */
export function rInt(a){

    return Math.floor(Math.random() * a + 1);
}



// Random binary value (true / false)
/**
 * 
 * @returns Bool
 */
export function rBinaryValue(){

    return Math.random() > 0.5; 
}



// One random value from an array
/**
 * 
 * @param {Array} array 
 * @returns Number
 */
export function rArrayValue(array){

    return array[Math.floor(Math.random() * array.length)];
}



//Getting n unique random integers from a range 
/**
 * 
 * @param {Number} range 
 * @param {Number} amount 
 * @returns Array
 */
export function rAmountIntegers(range, amount){
    
    let intArr = [];

    while(intArr.length < amount){
    let rInt = (Math.floor(Math.random() * range));
        if(!intArr.includes(rInt)){
            intArr.push(rInt);
        }
    }
    return intArr;
}



// Getting n unique values from an array
/**
 * 
 * @param {Array} array 
 * @returns Array
 */
export function arrUniqueValues(array) {

    return array.filter((value, index, self) => self.indexOf(value) === index);

}



// Random binary value (true / false) based on a probability (0-1)
/**
 * 
 * @returns Bool
 */
export function rAccurateBinaryValue(){

    return Math.round(Math.random() * 1) > 0; 
}
