import Helper from "../Helper.js";
import Sort from "../Sort.js";

export default class BubbleSort extends Sort {
    constructor(listHtml: NodeListOf<HTMLElement>, helper: Helper) {
        super(listHtml, helper);
    }
    async sort(): Promise<void> {
        for (let i = 0; i < this.length - 1; i++) {
            for (let j = 0; j < this.length - 1; j++) {
                await this.helper.compare(j, j + 1);
            }
            this.helper.markDone(this.length - 1 - i);
        }
        this.helper.markDone(0);
    }
}
