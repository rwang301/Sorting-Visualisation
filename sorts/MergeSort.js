var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Sort from "../Sort.js";
export default class MergeSort extends Sort {
    constructor(listHtml, helper) {
        super(listHtml, helper);
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mergeSort(0, this.length - 1);
        });
    }
    mergeSort(lo, hi) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lo >= hi) {
                return;
            }
            let mid = Math.floor((lo + hi) / 2);
            try {
                yield this.mergeSort(lo, mid);
                yield this.mergeSort(mid + 1, hi);
                yield this.mergeList(lo, mid, hi);
                if (lo == 0 && hi == this.length - 1) {
                    for (let k = 0; k < this.length; k++) {
                        this.helper.markDone(k);
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    mergeList(lo, mid, hi) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.helper.compareArray(lo, mid, hi);
            yield this.helper.pause();
            // Create a temp array with merged array
            const temp = [];
            let i = lo, j = mid + 1;
            while (i <= mid && j <= hi) {
                const valueOne = this.helper.getValue(i);
                const valueTwo = this.helper.getValue(j);
                if (valueOne && valueTwo) {
                    if (valueOne < valueTwo) {
                        temp.push(valueOne);
                        i++;
                    }
                    else {
                        temp.push(valueTwo);
                        j++;
                    }
                }
            }
            if (i <= mid) {
                temp.push(...[...this.list]
                    .slice(i, mid + 1)
                    .map((elem) => this.parseElementToInt(elem)));
            }
            if (j <= hi) {
                temp.push(...[...this.list]
                    .slice(j, hi + 1)
                    .map((elem) => this.parseElementToInt(elem)));
            }
            // Copy temp array to original array
            for (let k = lo, l = 0; k <= hi; k++, l++) {
                this.helper.setValue(k, temp[l]);
            }
            yield this.helper.removeCompare();
        });
    }
    parseElementToInt(elem) {
        const stringValue = elem.getAttribute("value");
        const numValue = stringValue ? parseInt(stringValue) : null;
        if (numValue)
            return numValue;
        else
            throw new Error('Unable to merge');
    }
}
