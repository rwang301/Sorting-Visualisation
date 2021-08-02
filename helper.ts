// ASSISTS IN UI CHANGES
import { HIGHERBOUND } from "./index.js";

export default class Helper {
    list: NodeListOf<HTMLElement>;

    constructor(list: NodeListOf<HTMLElement>) {
        this.list = list;
    }
    compare = (i: number, j: number): void => {
        if (this.getValue(i) > this.getValue(j)) {
            //highlight the two being compared
            this.list[i].classList.add("comparing");
            this.list[j].classList.add("comparing");
            this.swap(i, j);
        }
    };

    swap = (i: number, j: number): void => {
        let temp = this.getValue(j);
        this.setValue(j, this.getValue(i));
        this.setValue(i, temp);
        this.list[i].classList.remove("comparing");
        this.list[j].classList.remove("comparing");
    };

    getValue = (index: number): number => {
        return parseInt(this.list[index].getAttribute("value") || "-1");
    };

    setValue = (index: number, value: number): void => {
        this.list[index].setAttribute("value", `${value}`);
        const height = (value / HIGHERBOUND) * 100;
        this.list[index].style.height = `${height}%`;
    };
}
