var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ASSISTS IN UI CHANGES
import { HIGHERBOUND } from "./index.js";
export default class Helper {
    constructor(list, time) {
        this.compare = (i, j) => __awaiter(this, void 0, void 0, function* () {
            const valueOne = this.getValue(i);
            const valueTwo = this.getValue(j);
            if (valueOne && valueTwo) {
                if (valueOne > valueTwo) {
                    //highlight the two being compared
                    this.list[i].classList.add("comparing");
                    this.list[j].classList.add("comparing");
                    yield this.swap(i, j);
                }
            }
        });
        this.compareArray = (lo, mid, hi) => __awaiter(this, void 0, void 0, function* () {
            for (let i = lo; i <= hi; i++) {
                if (i <= mid) {
                    this.list[i].classList.add("leftArray");
                }
                else {
                    this.list[i].classList.add("rightArray");
                }
            }
        });
        this.removeCompare = () => __awaiter(this, void 0, void 0, function* () {
            const leftArray = document.querySelectorAll(".leftArray");
            const rightArray = document.querySelectorAll(".rightArray");
            leftArray.forEach((left) => left.classList.remove("leftArray"));
            rightArray.forEach((right) => right.classList.remove("rightArray"));
        });
        this.swap = (i, j) => __awaiter(this, void 0, void 0, function* () {
            yield this.pause();
            const temp = this.getValue(j);
            const valueOne = this.getValue(i);
            if (valueOne)
                this.setValue(j, valueOne);
            if (temp)
                this.setValue(i, temp);
            this.list[i].classList.remove("comparing");
            this.list[j].classList.remove("comparing");
        });
        this.getValue = (index, arr) => {
            if (arr) {
                return (!arr[index].getAttribute("value")) ? null : parseInt(arr[index].getAttribute("value"));
            }
            else {
                return (!this.list[index].getAttribute("value")) ? null : parseInt(this.list[index].getAttribute("value"));
            }
        };
        this.setValue = (index, value) => {
            this.list[index].setAttribute("value", `${value}`);
            const height = (value / HIGHERBOUND) * 100;
            this.list[index].style.height = `${height}%`;
        };
        this.pause = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                setTimeout(() => resolve(), this.time);
            });
        });
        this.markDone = (index, arr) => {
            if (arr)
                arr[index].classList.add("done");
            this.list[index].classList.add("done");
        };
        this.list = list;
        this.time = time;
    }
}
