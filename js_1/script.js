function isPalindrome(str) {
    if (!str || typeof str !== "string") {
        throw new Error("Argument must be string");
    }
    for (var i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - i - 1]) return false;
    }
    return true;
}

isPalindrome("aabbaa")

function calculateDiscount(price, discount) {
    if (
        !price || !discount ||
        !([price, discount].every((arg) => typeof arg === "number"))
    ) throw new Error("two number arguments are required");
    if (discount > 1 || discount < 0) {
        throw new Error("discount must be between 0 and 1");
    }
    return price * discount;
}

function movies() {
    var movies = ["The Godfather Trilogy", "Fight club", "Scraface"];
    const clone = JSON.parse(JSON.stringify(movies));

    movies[2] = "Taxi Driver";

    var last_element_a = movies[movies.length - 1];
    console.log(last_element_a);
    var last_element_b = movies.slice(movies.length - 1)[0];
    console.log(last_element_b);
    var last_element_c = movies.reverse()[0];
    console.log(last_element_c);

    movies.unshift("Scarface, Again");
}

function getLongestWord(paragraph) {
    if (typeof paragraph !== "string") {
        throw new Error("first argument must be string");
    }
    return paragraph.split(" ").sort((w1, w2) => w2.length - w1.length)[0];
}

function getUser() {
    var name, grades;
    do {
        name = prompt("Please enter your name");
    } while (!name);
    do {
        grades = prompt("Please enter your grades");
    } while (!grades);
    console.log(`Hello ${name}`);
    console.table(grades.split(",").map((grade) => ({ grade })));
}

var orders = [
    {
        orderId: "ORD001",
        customer: "John Doe",
        items: "item1:2,item2:1,item3:5",
        orderDate: "2023-12-01",
        deliveryDate: "2023-12-05",
        deliveryAddress: "123, Main Street, Springfield, USA",
    },
    {
        orderId: "ORD002",
        customer: "Jane Smith",
        items: "itemA:3,itemB:4",
        orderDate: "2023-11-15",
        deliveryDate: "2023-11-20",
        deliveryAddress: "Flat 4B, Elmwood Apartments, New York, USA",
    },
    {
        orderId: "ORD003",
        customer: "Alice Johnson",
        items: "itemX:1",
        orderDate: "2023-10-10",
        deliveryDate: "2023-10-15",
        deliveryAddress: "456, Pine Lane, Denver, USA",
    },
];

function transformOrder(order) {
    const deliveryAsDate = new Date(order.deliveryDate);
    const orderAsDate = new Date(order.orderDate);
    //
    const diffDays = Math.floor((deliveryAsDate - orderAsDate) / (1000 * 60 * 60 * 24)); 
    const [apt_number, street_name, city, country] = order.deliveryAddress.split(",").map(v=>v.trim())

    var result = {
        orderId: order.orderId,
        customer: order.customer,
        totalItems: [...order.items.matchAll(/\w+\:(\d+),?/g)].map((result) =>
            Number(result[1])
        ).reduce((t, c) => t + c, 0),
        orderDate: order.orderDate,
        deliveryDate: order.deliveryDate,
        deliveryDuration: diffDays,
        deliveryCountry: country,
        deliveryCity: city,
        deliveryStreet: street_name,
        buildingNumber: apt_number
    };
    return result
}

console.log(orders.map(transformOrder));
