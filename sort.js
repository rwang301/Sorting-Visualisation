var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Helper from "./helper.js";
export default class Sort {
    constructor(time) {
        this.BubbleSort = () => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.length - 1; i++) {
                for (let j = 0; j < this.length - 1; j++) {
                    yield this.helper.compare(j, j + 1);
                }
                this.helper.markDone(this.length - 1 - i);
            }
            this.helper.markDone(0);
        });
        this.InsertionSort = () => __awaiter(this, void 0, void 0, function* () {
            let sortedLen = 1;
            for (let i = 1; i < this.length; i++) {
                if (this.helper.getValue(i) < this.helper.getValue(sortedLen - 1)) {
                    for (let j = i; j > 0; j--) {
                        yield this.helper.compare(j - 1, j);
                    }
                }
                sortedLen++;
            }
            /* elements are not fully sorted until
            every element has been iterated */
            for (let k = 0; k < sortedLen; k++) {
                this.helper.markDone(k);
            }
        });
        this.SelectionSort = () => __awaiter(this, void 0, void 0, function* () {
            /* length - 1 because if (n-1) elements have all been the "minimum value"
            nth should be sorted by default */
            let minIndex = 0;
            for (let i = 0; i < this.length; i++) {
                let min = this.helper.getValue(i);
                // get min value
                for (let j = i + 1; j < this.length; j++) {
                    //find smallest element
                    if (this.helper.getValue(j) < min) {
                        minIndex = j;
                        min = this.helper.getValue(j);
                    }
                }
                yield this.helper.compare(i, minIndex);
                this.helper.markDone(i);
            }
        });
        this.lawton = () => {
            return this.list;
        };
        this.list = document.querySelectorAll(".bar");
        this.length = this.list.length;
        this.helper = new Helper(this.list, time);
    }
}
