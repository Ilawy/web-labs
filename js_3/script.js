//@ts-check
var DATA = {
    categories: [
        {
            key: "birds",
            name: "Birds",
            data: [
                "sparrow",
                "eagle",
                "hummingbird",
                "falcon",
                "penguin",
                "owl",
                "parrot",
                "canary",
                "raven",
                "pigeon",
                "finch",
                "heron",
                "woodpecker",
                "swallow",
                "flamingo",
            ],
        },
        {
            key: "food",
            name: "Food",
            data: [
                "apple",
                "bread",
                "carrot",
                "doughnut",
                "eggplant",
                "fish",
                "grapes",
                "honey",
                "jelly",
                "kale",
                "lemon",
                "mango",
                "noodles",
                "olive",
                "pasta",
            ],
        },
    ],
};

var keyboard = "abcdefghijklmnopqrstuvwxyz";

var keyboard_el = document.getElementById("keyboard");
if (!keyboard_el) throw new Error("Cannot find keyboard");

var message_el = document.getElementById("status_message");
if (!message_el) throw new Error("Cannot find status_message");

var actions_el = document.getElementById("status_actions");
if (!actions_el) throw new Error("Cannot find status_actions");

var display_el = document.getElementById("display");
if (!display_el) throw new Error("Cannot find display");
display_el.style.display = "none";


/**
 * @type {HTMLButtonElement[]}
 */
// @ts-ignore
const all_keys = keyboard_el.querySelectorAll("button.key");

function play(category) {
    var status = {
        tries: 6,
        /**@type {string[]} */
        chars: [],
        /**@type {number | null} */
        timer: null,
        loop: false,
        /**@type {((event: KeyboardEvent) => void) | null} */
        callback: null,
        /**@type {string | null} */
        word: null,
    };



    reset_game(status);

    var current_category = DATA.categories.find((c) => c.key === category);
    if (!current_category) {
        alert("Category not found, this should never happen");
        return;
    }
    var word = current_category
        .data[Math.floor(Math.random() * current_category.data.length)];
    // @ts-ignore
    message_el.innerHTML = `${current_category.name}`
    if (!word) {
        alert("Cannot retrive word, this should never happen");
        return;
    }
    status.word = word;

    word.split("").forEach((char, i) => {
        var char_el = document.createElement("span");
        char_el.classList.add("char");
        char_el.setAttribute("data-id", i.toString());
        //@ts-ignore
        display_el.appendChild(char_el);
    });
    // @ts-ignore
    display_el.style.display = "flex";

    function keypress(event) {
        var pressed = event.target.getAttribute("data-key");
        // var pos = word.indexOf(pressed, last_found_pos);
        const positions = Array.from(word.matchAll(new RegExp(pressed, "g")))
        if (positions.length === 0) {
            // @ts-ignore
            document.getElementById(`fault_${6 - status.tries + 1}`).style
                .display = "initial";

            status.tries--;
            //add animations
            event.target.disabled = true;
            event.target.classList.add("wrong");
            if (status.tries === 0) {
                //LOST
                lose(status);
            }
            return;
        }
        positions.forEach((pos) => {
            // @ts-ignore
            var pos_el = display_el.querySelector(`[data-id="${pos.index}"]`);
            // @ts-ignore
            pos_el.textContent = pressed;
            status.chars.push(pressed);
            event.target.disabled = true;
        });
        if (status.chars.length === word.length) {
            all_keys.forEach((key) => key.removeEventListener("click", keypress));
            initStatus(`You won`);
        }
    }
    status.callback = keypress;
    all_keys.forEach((key) => {
        key.style.display = "initial";
        key.addEventListener("click", keypress);
    });
}

function reset_game(status) {
    for (var i = 0; i < status.tries; i++) {
        // @ts-ignore
        document.getElementById(`fault_${i + 1}`).style.display = "none";
    }
    
    all_keys.forEach(
        (k) => {
        k.disabled = false;
        k.classList.remove("wrong");
    });
    // @ts-ignore
    message_el.innerHTML = "";
    // @ts-ignore
    actions_el.innerHTML = "";
    // @ts-ignore
    display_el.innerHTML = "";
}

function initStatus(message) {
    // @ts-ignore
    if (message) message_el.innerHTML = message;

    // @ts-ignore
    actions_el.innerHTML = "";

    var categories_el = createCategoriesElement();

    var again = document.createElement("button");
    again.innerHTML = "Play again";
    again.onclick = (ev) => {
        play(categories_el.value);
    };

    // @ts-ignore
    actions_el.append(again, categories_el);
}

function createCategoriesElement() {
    var category_el = document.createElement("select");
    DATA.categories.forEach((category) => {
        var el = document.createElement("option");
        el.value = category.key;
        el.innerHTML = category.name;
        category_el.append(el);
    });
    return category_el;
}

function lose(status) {
    all_keys.forEach((key) =>
        key.removeEventListener("click", status.callback)
    );
    initStatus(
        `<span>You lost</span><br><small>it was: ${status.word}</small>`,
    );
}

initStatus("Select category");
