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
        const valueOne = this.getValue(i);
        const valueTwo = this.getValue(j);
        if (valueOne && valueTwo) {
            if (valueOne > valueTwo) {
                //highlight the two being compared
                this.list[i].classList.add("comparing");
                this.list[j].classList.add("comparing");
                await this.swap(i, j);
            }
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
        const temp = this.getValue(j);
        const valueOne = this.getValue(i);
        if (valueOne) this.setValue(j, valueOne);
        if (temp) this.setValue(i, temp);
        this.list[i].classList.remove("comparing");
        this.list[j].classList.remove("comparing");
    };

    getValue = (index: number, arr?: HTMLElement[]): number | null => {
        if (arr) {
            return (!arr[index].getAttribute("value")) ? null : parseInt(arr[index].getAttribute("value")!);
        } else {
            return (!this.list[index].getAttribute("value")) ? null : parseInt(this.list[index].getAttribute("value")!);
        }
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
}
