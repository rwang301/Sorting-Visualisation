import Sort from "./sort.js";

export const LOWERBOUND = 1;
export const HIGHERBOUND = 100;

const generateArray = (size: number): number[] => {
    let randomArray = [];
    for (let i = 0; i < size; i++) {
        randomArray.push(Math.floor(Math.random() * HIGHERBOUND) + LOWERBOUND);
    }
    return randomArray;
};

const drawArray = (arr: number[]): void => {
    const animation = document.getElementById("animation");
    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement("div");
        const height = (arr[i] / HIGHERBOUND) * 100;
        bar.classList.add("bar");
        bar.setAttribute("value", `${arr[i]}`);
        bar.style.height = `${height}%`;
        animation?.appendChild(bar);
    }
};

const arr = generateArray(10);
console.log(arr);
drawArray(arr);
const sort = new Sort(1000);
console.log(sort.BubbleSort());
