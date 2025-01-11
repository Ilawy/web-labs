// [2] Write a function to calculate the number of vowels in a string

/**
 * 
 * @param {string} string 
 * @returns 
 */
function countVowels(string){
    return string
        .split("")
        .filter(function(char){
            return /[aeiou]/i.test(char)
        })
        .reduce(function (result, char) {
            if (Object.keys(result).includes(char)) {
                result[char]++;
            } else {
                result[char] = 1;
            }
            return result;
        }, {})

    
}



console.log(countVowels("hello world"));
