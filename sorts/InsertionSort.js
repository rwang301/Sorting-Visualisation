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
export default class InsertionSort extends Sort {
    constructor(listHtml, helper) {
        super(listHtml, helper);
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
}
