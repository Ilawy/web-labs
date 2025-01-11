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
    levels: {
        "easy": 50000,
        "mid": 40000,
        "hard": 30000
    }
};

var keyboard_el = document.getElementById("keyboard");
if (!keyboard_el) throw new Error("Cannot find keyboard");

/**@type {SVGAElement} */
// @ts-ignore
var timer_el = document.getElementById("timer");

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

/**
 * 
 * @param {keyof typeof DATA.levels} level 
 * @returns {number}
 */
function getDurationByLevel(level){
    return Object.keys(DATA.levels).includes(level) ? DATA.levels[level] : DATA.levels.easy
}

function play(category, level) {
    var status = {
        tries: 6,
        /**@type {string[]} */
        chars: [],
        /**@type {number | undefined} */
        timer: undefined,
        loop: true,
        /**@type {((event: KeyboardEvent) => void) | null} */
        callback: null,
        /**@type {string | null} */
        word: null,
    };

    reset_game(status);
    var duration_in_ms = getDurationByLevel(level);
    console.log(duration_in_ms);
    
    var animation_props = {
        start: 0,
        end: 565.48,
    };
    var then = +new Date();
    function animate(ts = 0) {
        var now = +new Date();
        var diff = now - then;
        var match_result = window.getComputedStyle(timer_el).strokeDashoffset
            .match(/(\d+)px/);
        var current_offset = match_result ? Number(match_result[1]) : 0;

        const progress = Math.min(diff / duration_in_ms, 1);
        const currentValue = Math.floor(
            animation_props.start +
                (animation_props.end - animation_props.start) * progress,
        );

        timer_el.style.strokeDashoffset = `${currentValue}px`;

        console.log(current_offset);

        console.log();
        if (status.loop) requestAnimationFrame(animate);
    }

    animate();

    status.timer = setTimeout(function () {
        lose(status);
    }, duration_in_ms);

    var current_category = DATA.categories.find(function (c) {
        return c.key === category;
    });
    if (!current_category) {
        alert("Category not found, this should never happen");
        return;
    }
    var word = current_category
        .data[Math.floor(Math.random() * current_category.data.length)];

    // var word = "apple"

    // @ts-ignore
    message_el.innerHTML = `${current_category.name}`;
    if (!word) {
        alert("Cannot retrive word, this should never happen");
        return;
    }
    status.word = word;

    word.split("").forEach(function (char, i) {
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
        const positions = Array.from(word.matchAll(new RegExp(pressed, "g")));
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
        positions.forEach(function (pos) {
            // @ts-ignore
            var pos_el = display_el.querySelector(`[data-id="${pos.index}"]`);
            // @ts-ignore
            pos_el.textContent = pressed;
            status.chars.push(pressed);
            event.target.disabled = true;
        });
        if (status.chars.length === word.length) {
            all_keys.forEach(function (key) {
                return key.removeEventListener("click", keypress);
            });
            clearTimeout(status.timer)
            status.loop = false
            initStatus(`You won`);
        }
    }
    status.callback = keypress;
    all_keys.forEach(function (key) {
        key.style.display = "initial";
        key.addEventListener("click", keypress);
    });
}

function reset_game(status) {
    for (var i = 0; i < status.tries; i++) {
        // @ts-ignore
        document.getElementById(`fault_${i + 1}`).style.display = "none";
    }
    timer_el.style.strokeDashoffset = "0px";

    all_keys.forEach(
        function (k) {
            k.disabled = false;
            k.classList.remove("wrong");
        },
    );
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
    timer_el.style.strokeDashoffset = "0px";

    // @ts-ignore
    actions_el.innerHTML = "";

    var categories_el = createCategoriesElement();
    var levels_el = createLevelsElement();

    var again = document.createElement("button");
    again.innerHTML = "Play again";
    again.onclick = function (ev) {
        play(categories_el.value, levels_el.value);
    };

    // @ts-ignore
    actions_el.append(again, categories_el, levels_el);
}

function createCategoriesElement() {
    var category_el = document.createElement("select");
    DATA.categories.forEach(function (category) {
        var el = document.createElement("option");
        el.value = category.key;
        el.innerHTML = category.name;
        category_el.append(el);
    });
    return category_el;
}

function createLevelsElement(){
    var levels_el = document.createElement("select");
    Object.keys(DATA.levels).forEach(function (level) {
            var el = document.createElement("option");
            el.value = level;
            el.innerHTML = level;
            levels_el.append(el);
        })
    return levels_el
    
}

function lose(status) {
    status.loop = false;
    all_keys.forEach(function (key) {
        return key.removeEventListener("click", status.callback);
    });
    initStatus(
        `<span>You lost</span><br><small>it was: ${status.word}</small>`,
    );
}

initStatus("Select category");
