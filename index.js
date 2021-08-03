import Sort from "./sort.js";
export const LOWERBOUND = 1;
export const HIGHERBOUND = 100;
const generateArray = (size) => {
    let randomArray = [];
    for (let i = 0; i < size; i++) {
        randomArray.push(Math.floor(Math.random() * HIGHERBOUND) + LOWERBOUND);
    }
    return randomArray;
};
const drawArray = (arr) => {
    const animation = document.getElementById("animation");
    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement("div");
        const height = (arr[i] / HIGHERBOUND) * 100;
        bar.classList.add("bar");
        bar.setAttribute("value", `${arr[i]}`);
        bar.style.height = `${height}%`;
        animation === null || animation === void 0 ? void 0 : animation.appendChild(bar);
    }
};
const arr = generateArray(10);
console.log(arr);
drawArray(arr);
const sort = new Sort(1000);
console.log(sort.InsertionSort());
