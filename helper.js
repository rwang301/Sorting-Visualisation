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
            if (this.getValue(i) > this.getValue(j)) {
                //highlight the two being compared
                this.list[i].classList.add("comparing");
                this.list[j].classList.add("comparing");
                yield this.swap(i, j);
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
            let temp = this.getValue(j);
            this.setValue(j, this.getValue(i));
            this.setValue(i, temp);
            this.list[i].classList.remove("comparing");
            this.list[j].classList.remove("comparing");
        });
        this.getValue = (index, arr) => {
            if (arr)
                return parseInt(arr[index].getAttribute("value") || "-1");
            return parseInt(this.list[index].getAttribute("value") || "-1");
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
        this.quickSwap = (i, j, arr) => __awaiter(this, void 0, void 0, function* () {
            let temp = arr[i].style.height;
            let tempVal = this.getValue(i, arr);
            arr[i].classList.add("comparing");
            arr[j].classList.add("comparing");
            yield this.pause();
            arr[i].style.height = arr[j].style.height;
            arr[i].setAttribute("value", arr[j].getAttribute("value") || "");
            // arr[i] = arr[j];
            arr[j].style.height = temp;
            arr[j].setAttribute("value", `${tempVal}` || "");
            // arr[j] = temp;
            arr[i].classList.remove("comparing");
            arr[j].classList.remove("comparing");
        });
        this.list = list;
        this.time = time;
    }
}
