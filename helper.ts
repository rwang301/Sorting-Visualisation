// ASSISTS IN UI CHANGES
import { HIGHERBOUND } from "./index.js";

export default class Helper {
    list: NodeListOf<HTMLElement>;
    time: number;

    constructor(list: NodeListOf<HTMLElement>, time: number) {
        this.list = list;
        this.time = time;
    }
    compare = async (i: number, j: number): Promise<void> => {
        if (this.getValue(i) > this.getValue(j)) {
            //highlight the two being compared
            this.list[i].classList.add("comparing");
            this.list[j].classList.add("comparing");
            await this.swap(i, j);
        }
    };

    compareArray = async (
        lo: number,
        mid: number,
        hi: number
    ): Promise<void> => {
        for (let i = lo; i <= hi; i++) {
            if (i <= mid) {
                this.list[i].classList.add("leftArray");
            } else {
                this.list[i].classList.add("rightArray");
            }
        }
    };

    removeCompare = async (): Promise<void> => {
        const leftArray = document.querySelectorAll(".leftArray");
        const rightArray = document.querySelectorAll(".rightArray");
        leftArray.forEach((left) => left.classList.remove("leftArray"));
        rightArray.forEach((right) => right.classList.remove("rightArray"));
    };

    swap = async (i: number, j: number): Promise<void> => {
        await this.pause();
        let temp = this.getValue(j);
        this.setValue(j, this.getValue(i));
        this.setValue(i, temp);
        this.list[i].classList.remove("comparing");
        this.list[j].classList.remove("comparing");
    };

    getValue = (index: number, arr?: HTMLElement[]): number => {
        if (arr) return parseInt(arr[index].getAttribute("value") || "-1");
        return parseInt(this.list[index].getAttribute("value") || "-1");
    };

    setValue = (index: number, value: number): void => {
        this.list[index].setAttribute("value", `${value}`);
        const height = (value / HIGHERBOUND) * 100;
        this.list[index].style.height = `${height}%`;
    };

    pause = async (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), this.time);
        });
    };

    markDone = (index: number, arr?: HTMLElement[]): void => {
        if (arr) arr[index].classList.add("done");
        this.list[index].classList.add("done");
    };

    quickSwap = async (
        i: number,
        j: number,
        arr: HTMLElement[]
    ): Promise<void> => {
        let temp = arr[i].style.height;
        let tempVal = this.getValue(i, arr);
        arr[i].classList.add("comparing");
        arr[j].classList.add("comparing");
        await this.pause();
        arr[i].style.height = arr[j].style.height;
        arr[i].setAttribute("value", arr[j].getAttribute("value") || "");
        // arr[i] = arr[j];
        arr[j].style.height = temp;
        arr[j].setAttribute("value", `${tempVal}` || "");
        // arr[j] = temp;
        arr[i].classList.remove("comparing");
        arr[j].classList.remove("comparing");
    };
}
