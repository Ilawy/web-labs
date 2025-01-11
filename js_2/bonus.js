/**
 * @param {string} data
 */
function calculateAge(date) {
    const dob = new Date(date);
    if (Number.isNaN(+dob)) throw new Error("Invalid date");
    return Math.floor((new Date() - dob) / (1000 * 60 * 60 * 24 * 365));
}

console.log(
    calculateAge("2000-2-7") ,
);


console.log(Number(
    new Date()
));
