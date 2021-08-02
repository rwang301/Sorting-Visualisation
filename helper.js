// ASSISTS IN UI CHANGES
import { HIGHERBOUND } from "./index.js";
export default class Helper {
    constructor(list) {
        this.compare = (i, j) => {
            if (this.getValue(i) > this.getValue(j)) {
                //highlight the two being compared
                this.list[i].classList.add("comparing");
                this.list[j].classList.add("comparing");
                this.swap(i, j);
            }
        };
        this.swap = (i, j) => {
            let temp = this.getValue(j);
            this.setValue(j, this.getValue(i));
            this.setValue(i, temp);
            this.list[i].classList.remove("comparing");
            this.list[j].classList.remove("comparing");
        };
        this.getValue = (index) => {
            return parseInt(this.list[index].getAttribute("value") || "-1");
        };
        this.setValue = (index, value) => {
            this.list[index].setAttribute("value", `${value}`);
            const height = (value / HIGHERBOUND) * 100;
            this.list[index].style.height = `${height}%`;
        };
        this.list = list;
    }
}
