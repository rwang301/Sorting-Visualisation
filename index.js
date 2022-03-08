import Helper from "./helper.js";
import BubbleSort from "./sorts/BubbleSort.js";
import InsertionSort from "./sorts/InsertionSort.js";
import MergeSort from "./sorts/MergeSort.js";
import QuickSort from "./sorts/QuickSort.js";
import SelectionSort from "./sorts/SelectionSort.js";
export const LOWERBOUND = 1;
export const HIGHERBOUND = 100;
var SortingAlgorithm;
(function (SortingAlgorithm) {
    SortingAlgorithm[SortingAlgorithm["BubbleSort"] = 0] = "BubbleSort";
    SortingAlgorithm[SortingAlgorithm["InsertionSort"] = 1] = "InsertionSort";
    SortingAlgorithm[SortingAlgorithm["SelectionSort"] = 2] = "SelectionSort";
    SortingAlgorithm[SortingAlgorithm["MergeSort"] = 3] = "MergeSort";
    SortingAlgorithm[SortingAlgorithm["QuickSort"] = 4] = "QuickSort";
})(SortingAlgorithm || (SortingAlgorithm = {}));
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
const clearAnimation = () => {
    const animation = document.getElementById("animation");
    if (animation)
        animation.innerHTML = "";
};
const randomButton = document.getElementById("randomButton");
randomButton === null || randomButton === void 0 ? void 0 : randomButton.addEventListener("click", () => {
    const arraySize = parseInt(document.getElementById("size-menu").value);
    if (isNaN(arraySize))
        return;
    clearAnimation();
    console.log(arraySize);
    drawArray(generateArray(arraySize));
});
const sortButton = document.getElementById("sortButton");
sortButton === null || sortButton === void 0 ? void 0 : sortButton.addEventListener("click", () => {
    const sortType = parseInt(document.getElementById("sort-menu").value);
    const arraySize = parseInt(document.getElementById("size-menu").value);
    const speed = parseFloat(document.getElementById("speed-menu").value);
    if (isNaN(sortType) || isNaN(arraySize) || isNaN(speed)) {
        alert("Please fill all options");
        return;
    }
    clearAnimation();
    drawArray(generateArray(arraySize));
    let sortingAlgo;
    const listHtml = document.querySelectorAll('.bar');
    const helper = new Helper(listHtml, 250 / speed);
    switch (sortType) {
        case SortingAlgorithm.BubbleSort:
            sortingAlgo = new BubbleSort(listHtml, helper);
            sortingAlgo.sort();
            break;
        case SortingAlgorithm.InsertionSort:
            sortingAlgo = new InsertionSort(listHtml, helper);
            sortingAlgo.sort();
            break;
        case SortingAlgorithm.SelectionSort:
            sortingAlgo = new SelectionSort(listHtml, helper);
            sortingAlgo.sort();
            break;
        case SortingAlgorithm.MergeSort:
            sortingAlgo = new MergeSort(listHtml, helper);
            sortingAlgo.sort();
            break;
        case SortingAlgorithm.QuickSort:
            sortingAlgo = new QuickSort(listHtml, helper);
            sortingAlgo.sort();
            break;
        default:
            break;
    }
});
// const arr = generateArray(50);
// console.log(arr);
// drawArray(arr);
// const sort = new Sort(100);
// // sort.BubbleSort();
// // sort.InsertionSort();
// // sort.SelectionSort();
// // sort.MergeSort(0, 99);
// sort.QuickSort([
//     ...(document.querySelectorAll(".bar") as NodeListOf<HTMLElement>),
// ]);
