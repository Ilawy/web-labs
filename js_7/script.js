//@ts-check
import DATA from './dataset.js'
import { createCategoriesElement, createLevelsElement, initStatus, lose, reset_game } from "./game.js"


const keyboard_el = document.getElementById("keyboard");
if (!keyboard_el) throw new Error("Cannot find keyboard");

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
    const status = {
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
    const duration_in_ms = getDurationByLevel(level);
    console.log(duration_in_ms);
    
    const animation_props = {
        start: 0,
        end: 565.48,
    };
    const then = +new Date();
    function animate(ts = 0) {
        const now = +new Date();
        const diff = now - then;
        const match_result = window.getComputedStyle(timer_el).strokeDashoffset
            .match(/(\d+)px/);
        const current_offset = match_result ? Number(match_result[1]) : 0;

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

    const current_category = DATA.categories.find(function (c) {
        return c.key === category;
    });
    if (!current_category) {
        alert("Category not found, this should never happen");
        return;
    }
    const word = current_category
        .data[Math.floor(Math.random() * current_category.data.length)];

    // const word = "apple"

    // @ts-ignore
    message_el.innerHTML = `${current_category.name}`;
    if (!word) {
        alert("Cannot retrive word, this should never happen");
        return;
    }
    status.word = word;

    word.split("").forEach(function (char, i) {
        const char_el = document.createElement("span");
        char_el.classList.add("char");
        char_el.setAttribute("data-id", i.toString());
        //@ts-ignore
        display_el.appendChild(char_el);
    });
    // @ts-ignore
    display_el.style.display = "flex";

    function keypress(event) {
        const pressed = event.target.getAttribute("data-key");
        // const pos = word.indexOf(pressed, last_found_pos);
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
            const pos_el = display_el.querySelector(`[data-id="${pos.index}"]`);
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


initStatus("Select category");


