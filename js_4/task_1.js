// Create an array method that calculates the average for an array of numbers.


Array.prototype.average = function(){
    var total = 0;
    for(var i = 0; i < this.length; i++){
        if(typeof this[i] !== "number" || !Number.isNaN(this[i]))throw new Error(`Expected number got ${typeof this[i]}, this[${i}]`);
        total += this[i];
    }
    return total / this.length
}


console.log([1, 2, 3].average());
