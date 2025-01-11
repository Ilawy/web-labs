// Write a function to calculate the sum of digits in a number

function numsOfDigits(number){
    var result = number;
    var items = 0;
    while(result > 0){
        items++;
        result = Math.floor(result / 10);
    }
    return items;
}

console.log(numsOfDigits(1339));
