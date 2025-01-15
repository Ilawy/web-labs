import DATA from "./dataset.js"
/**@type {SVGAElement} */
// @ts-ignore
const timer_el = document.getElementById("timer");

const message_el = document.getElementById("status_message");
if (!message_el) throw new Error("Cannot find status_message");

const actions_el = document.getElementById("status_actions");
if (!actions_el) throw new Error("Cannot find status_actions");

const display_el = document.getElementById("display");
if (!display_el) throw new Error("Cannot find display");
display_el.style.display = "none";


export function reset_game(status) {
    for (const i = 0; i < status.tries; i++) {
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

export function initStatus(message) {
    // @ts-ignore
    if (message) message_el.innerHTML = message;
    timer_el.style.strokeDashoffset = "0px";

    // @ts-ignore
    actions_el.innerHTML = "";

    const categories_el = createCategoriesElement();
    const levels_el = createLevelsElement();

    const again = document.createElement("button");
    again.innerHTML = "Play again";
    again.onclick = function (ev) {
        play(categories_el.value, levels_el.value);
    };

    // @ts-ignore
    actions_el.append(again, categories_el, levels_el);
}

export function createCategoriesElement() {
    const category_el = document.createElement("select");
    DATA.categories.forEach(function (category) {
        const el = document.createElement("option");
        el.value = category.key;
        el.innerHTML = category.name;
        category_el.append(el);
    });
    return category_el;
}

export function createLevelsElement(){
    const levels_el = document.createElement("select");
    Object.keys(DATA.levels).forEach(function (level) {
            const el = document.createElement("option");
            el.value = level;
            el.innerHTML = level;
            levels_el.append(el);
        })
    return levels_el
    
}

export function lose(status) {
    status.loop = false;
    all_keys.forEach(function (key) {
        return key.removeEventListener("click", status.callback);
    });
    initStatus(
        `<span>You lost</span><br><small>it was: ${status.word}</small>`,
    );
}
