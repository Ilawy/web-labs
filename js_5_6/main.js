/*
1- You're tasked with modeling vehicles and cars in a transportation app:
    X - A Vehicle has type and speed properties.
    X - All vehicles can start and stop.
    X - A Car inherits from Vehicle and has an additional drive method.

    X a- Implement this using ES6 classes
     X - Limit the number of Vehicle instances to 50. If an attempt is made to create the 51st vehicle, throw an error with the message: 'Vehicle limit reached'.
     X - the implementation of the methods can be console.log only or you can leave them empty
 
    b- Write a function that checks whether an object is an instance of Car using two different ways

*/

class Vehicle {

    /**@type {string} */
    type;

    #count = 0;
    
    constructor(type){
        if(++this.#count > 50)throw new Error("Factory is full")
        this.type = type;
    }


    start(){
        console.log("car stopped");
    }

    stop(){

    }
}


class Car extends Vehicle{
    static isCar(ref){
        return ref instanceof Car && Object.getPrototypeOf(ref).constructor === Car
    }

    /**@type {string} */
    color;
    
    constructor(color){
        super("car")
        this.color = color;
    }


    drive(){

    }

}
