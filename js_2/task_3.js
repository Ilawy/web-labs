// [3] Write a function to calculate the number of occurances of a character in a string

/**
 * 
 * @param {string} string 
 * @param {string} target 
 * @returns 
 */
function findOccurs(string, target){
    return string.split("").reduce((result, char)=>{
        if(target.toLocaleLowerCase() === char.toLocaleLowerCase())result++;
        return result
    }, 0)
}

console.log(findOccurs("Hello world hOla", "o"));
