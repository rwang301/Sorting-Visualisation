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
export default class SelectionSort extends Sort {
    constructor(listHtml, helper) {
        super(listHtml, helper);
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
}
