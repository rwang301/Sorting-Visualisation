import Helper from "../Helper.js";
import Sort from "../Sort.js";

export default class SelectionSort extends Sort {
    constructor(listHtml: NodeListOf<HTMLElement>, helper: Helper) {
        super(listHtml, helper);
    }
    async sort(): Promise<void> {
        /* length - 1 because if (n-1) elements have all been the "minimum value"
        nth should be sorted by default */
        let minIndex = 0;
        for (let i = 0; i < this.length; i++) {
            let min = this.helper.getValue(i);
            minIndex = i;
            // get min value
            for (let j = i + 1; j < this.length; j++) {
                //find smallest element
                const value = this.helper.getValue(j);
                if (value && min && value < min) {
                    minIndex = j;
                    min = this.helper.getValue(j);
                }
            }
            await this.helper.compare(i, minIndex);
            this.helper.markDone(i);
        }
    }
}
