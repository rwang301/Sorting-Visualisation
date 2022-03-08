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
export default class BubbleSort extends Sort {
    constructor(listHtml, helper) {
        super(listHtml, helper);
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.length - 1; i++) {
                for (let j = 0; j < this.length - 1; j++) {
                    yield this.helper.compare(j, j + 1);
                }
                this.helper.markDone(this.length - 1 - i);
            }
            this.helper.markDone(0);
        });
    }
}
