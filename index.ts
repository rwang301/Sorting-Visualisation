import Helper from "./Helper.js";
import Sort from "./Sort.js";
import BubbleSort from "./sorts/BubbleSort.js";
import InsertionSort from "./sorts/InsertionSort.js";
import MergeSort from "./sorts/MergeSort.js";
import QuickSort from "./sorts/QuickSort.js";
import SelectionSort from "./sorts/SelectionSort.js";

export const LOWERBOUND = 1;
export const HIGHERBOUND = 100;

enum SortingAlgorithm {
    BubbleSort,
    InsertionSort,
    SelectionSort,
    MergeSort,
    QuickSort
}

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

const clearAnimation = () => {
    const animation = document.getElementById("animation");
    if (animation) animation.innerHTML = "";
};

const randomButton = document.getElementById("randomButton");
randomButton?.addEventListener("click", () => {
    const arraySize = parseInt(
        (document.getElementById("size-menu") as HTMLInputElement).value
    );
    if (isNaN(arraySize)) return;
    clearAnimation();
    console.log(arraySize);
    drawArray(generateArray(arraySize));
});

const sortButton = document.getElementById("sortButton");
sortButton?.addEventListener("click", () => {
    const sortType = parseInt(
        (document.getElementById("sort-menu") as HTMLInputElement).value
    );
    const arraySize = parseInt(
        (document.getElementById("size-menu") as HTMLInputElement).value
    );
    const speed = parseFloat(
        (document.getElementById("speed-menu") as HTMLInputElement).value
    );
    if (isNaN(sortType) || isNaN(arraySize) || isNaN(speed)) {
        alert("Please fill all options");
        return;
    }
    clearAnimation();
    drawArray(generateArray(arraySize));
    let sortingAlgo: Sort;
    const listHtml: NodeListOf<HTMLElement> = document.querySelectorAll('.bar') as NodeListOf<HTMLElement>;
    const helper: Helper = new Helper(listHtml, 250/speed);
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