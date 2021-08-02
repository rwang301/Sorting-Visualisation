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
        this.lawton = () => {
            return this.list;
        };
        this.list = document.querySelectorAll(".bar");
        this.length = this.list.length;
        this.helper = new Helper(this.list, time);
    }
}
