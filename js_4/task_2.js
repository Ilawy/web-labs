// When trying to convert an object to string, the output is always '[object object]'.

// --- A ---
Object.prototype.toString = function(){
    return 'This is an object'
}
console.log(String({}));

// --- B ---
var special = {message: "This is a message"}
Object.setPrototypeOf(special, {
    toString(){
        return this.message
    }
})

console.log(String(special));
