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
    console.log(speed);
    clearAnimation();
    drawArray(generateArray(arraySize));
    const sort = new Sort(100 / speed);
    switch (sortType) {
        case 0:
            sort.BubbleSort();
            break;
        case 1:
            sort.SelectionSort();
            break;
        case 2:
            sort.InsertionSort();
            break;
        case 3:
            sort.MergeSort(0, arraySize - 1);
            break;
        case 4:
            sort.QuickSort([
                ...(document.querySelectorAll(
                    ".bar"
                ) as NodeListOf<HTMLElement>),
            ]);
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
