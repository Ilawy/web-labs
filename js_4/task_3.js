/*
3- You're tasked with modeling vehicles and cars in a transportation app:
    - X A Vehicle has type and speed properties.
    - X All vehicles can start and stop.
    - X A Car inherits from Vehicle and has an additional drive method.

    a- X Implement this using ES5 function constructors
     - Limit the number of Vehicle instances to 50. If an attempt is made to create the 51st vehicle, throw an error with the message: 'Vehicle limit reached'.
     - the implementation of the methods can be console.log only or you can leave them empty

    b- Write a function that checks whether an object is an instance of Car using two different ways
*/

function Vehicle(type, speed) {
    if (++Vehicle.count >= 50) throw new Error("Factory is full");

    this.type = type;
    this.speed = speed;
    this.start = function () {
        console.log("V: Started", this.type);
    };
    this.stop = function () {
        console.log("V: Stopped", this.type);
    };
}
Vehicle.count = 0;

function Car(speed, color) {
    this.__proto__ = new Vehicle("car", speed);
    this.color = color;
    this.drift = function () {
        console.log("C: drifting");
    };
}

function isVehicle(ref) {
    return ref instanceof Vehicle && //first
        Object.getPrototypeOf(ref).constructor === Vehicle; // second
}

var c = new Car(240, "red");
console.log(isVehicle(c));
c.start()
c.stop()

for (var i = 0; i < 60; i++) {
    var v = new Car(i);
}
