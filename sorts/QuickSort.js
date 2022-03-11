var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Sort from "../sort.js";
export default class QuickSort extends Sort {
    constructor(listHtml, helper) {
        super(listHtml, helper);
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.quickSort([...this.list]);
        });
    }
    quickSort(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            if (arr.length <= 1) {
                arr.length == 1 && this.helper.markDone(0, arr);
                return;
            }
            try {
                let index = yield this.partition(arr);
                this.helper.markDone(index, arr);
                yield this.quickSort(arr.slice(0, index));
                yield this.quickSort(arr.slice(index + 1, arr.length));
            }
            catch (error) {
                console.error(error);
            }
            return;
        });
    }
    partition(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            //just ensures that every value left of the pivot is smaller
            //and every value to the right is bigger (not necessarily sorted)
            let pivot = this.helper.getValue(0, arr);
            if (!pivot)
                throw new Error('Unable to get pivot value');
            let i = 1, j = arr.length - 1;
            while (i < j) {
                let iterator;
                while (i != j) {
                    // while (this.helper.getValue(i, arr) <= pivot && i != j) i++;
                    // while (this.helper.getValue(j, arr) > pivot && i != j) j--;
                    iterator = this.helper.getValue(i, arr);
                    if (iterator && iterator > pivot) {
                        break;
                    }
                    i++;
                }
                while (i != j) {
                    iterator = this.helper.getValue(j, arr);
                    if (iterator && iterator <= pivot) {
                        break;
                    }
                    j--;
                }
                // swaps and styles
                if (i >= j)
                    break;
                yield this.quickSwap(i, j, arr);
            }
            // means i == j
            // swap the pivot to it's sorted position
            // edge case in quick sort if first element is the largest
            // as i will be length and cause referenceerror in array
            const indexStoppedAt = this.helper.getValue(i, arr);
            if (!indexStoppedAt)
                throw new Error('Unable to get value');
            let sortedPos = pivot > indexStoppedAt ? i : i - 1;
            yield this.quickSwap(0, sortedPos, arr);
            return sortedPos;
        });
    }
    ;
    quickSwap(i, j, arr) {
        return __awaiter(this, void 0, void 0, function* () {
            let temp = arr[i].style.height;
            let tempVal = this.helper.getValue(i, arr);
            arr[i].classList.add("comparing");
            arr[j].classList.add("comparing");
            yield this.helper.pause();
            arr[i].style.height = arr[j].style.height;
            arr[i].setAttribute("value", arr[j].getAttribute("value") || "");
            arr[j].style.height = temp;
            arr[j].setAttribute("value", `${tempVal}` || "");
            arr[i].classList.remove("comparing");
            arr[j].classList.remove("comparing");
        });
    }
}
