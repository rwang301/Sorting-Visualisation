import Helper from "../helper.js";
import Sort from "../sort.js";

export default class InsertionSort extends Sort {
    constructor(listHtml: NodeListOf<HTMLElement>, helper: Helper) {
        super(listHtml, helper);
    }
    async sort(): Promise<void> {
        let sortedLen = 1;
        for (let i = 1; i < this.length; i++) {
            if (this.helper.getValue(i) < this.helper.getValue(sortedLen - 1)) {
                for (let j = i; j > 0; j--) {
                    await this.helper.compare(j - 1, j);
                }
            }
            sortedLen++;
        }
        /* elements are not fully sorted until
        every element has been iterated */
        for (let k = 0; k < sortedLen; k++) {
            this.helper.markDone(k);
        }
    }
}
