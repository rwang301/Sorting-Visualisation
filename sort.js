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
                minIndex = i;
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
        this.MergeSort = (lo, hi) => __awaiter(this, void 0, void 0, function* () {
            if (lo >= hi) {
                return;
            }
            let mid = Math.floor((lo + hi) / 2);
            yield this.MergeSort(lo, mid);
            yield this.MergeSort(mid + 1, hi);
            yield this.Merge(lo, mid, hi);
            if (lo == 0 && hi == this.length - 1) {
                for (let k = 0; k < this.length; k++) {
                    this.helper.markDone(k);
                }
            }
        });
        this.Merge = (lo, mid, hi) => __awaiter(this, void 0, void 0, function* () {
            yield this.helper.compareArray(lo, mid, hi);
            yield this.helper.pause();
            // Create a temp array with merged array
            const temp = [];
            let i = lo, j = mid + 1;
            while (i <= mid && j <= hi) {
                if (this.helper.getValue(i) < this.helper.getValue(j)) {
                    temp.push(this.helper.getValue(i++));
                }
                else {
                    temp.push(this.helper.getValue(j++));
                }
            }
            if (i <= mid) {
                temp.push(...[...this.list]
                    .slice(i, mid + 1)
                    .map((elem) => parseInt(elem.getAttribute("value") || "-1")));
            }
            if (j <= hi) {
                temp.push(...[...this.list]
                    .slice(j, hi + 1)
                    .map((elem) => parseInt(elem.getAttribute("value") || "-1")));
            }
            // Copy temp array to original array
            for (let k = lo, l = 0; k <= hi; k++, l++) {
                this.helper.setValue(k, temp[l]);
            }
            yield this.helper.removeCompare();
        });
        this.QuickSort = (arr) => __awaiter(this, void 0, void 0, function* () {
            if (arr.length <= 1) {
                arr.length == 1 && this.helper.markDone(0, arr);
                return;
            }
            let index = yield this.Partition(arr);
            this.helper.markDone(index, arr);
            // console.log(index);
            yield this.QuickSort(arr.slice(0, index));
            yield this.QuickSort(arr.slice(index + 1, arr.length));
            return;
        });
        this.Partition = (arr) => __awaiter(this, void 0, void 0, function* () {
            //just ensures that every value left of the pivot is smaller
            //and every value to the right is bigger (not necessarily sorted)
            let pivot = this.helper.getValue(0, arr);
            let i = 1, j = arr.length - 1;
            while (i < j) {
                while (this.helper.getValue(i, arr) <= pivot && i != j)
                    i++;
                while (this.helper.getValue(j, arr) > pivot && i != j)
                    j--;
                // swaps and styles
                if (i >= j)
                    break;
                yield this.helper.quickSwap(i, j, arr);
            }
            // means i == j
            // swap the pivot to it's sorted position
            let sortedPos = pivot > this.helper.getValue(i, arr) ? i : i - 1;
            yield this.helper.quickSwap(0, sortedPos, arr);
            return sortedPos;
        });
        this.lawton = () => {
            return this.list;
        };
        this.list = document.querySelectorAll(".bar");
        this.quickList = [...this.list];
        this.length = this.list.length;
        this.helper = new Helper(this.list, time);
    }
}
