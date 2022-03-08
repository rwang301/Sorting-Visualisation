import Helper from "../Helper.js";
import Sort from "../Sort.js";

export default class MergeSort extends Sort {
    constructor(listHtml: NodeListOf<HTMLElement>, helper: Helper) {
        super(listHtml, helper);
    }
    async sort(): Promise<void> {
        await this.mergeSort(0, this.length - 1);
    }
    
    private async mergeSort(lo: number, hi: number): Promise<void> {
        if (lo >= hi) {
            return;
        }
        let mid = Math.floor((lo + hi) / 2);
        await this.mergeSort(lo, mid);
        await this.mergeSort(mid + 1, hi);
        await this.mergeList(lo, mid, hi);
        if (lo == 0 && hi == this.length - 1) {
            for (let k = 0; k < this.length; k++) {
                this.helper.markDone(k);
            }
        }
    }

    private async mergeList(lo: number, mid: number, hi: number): Promise<void> {
        await this.helper.compareArray(lo, mid, hi);
        await this.helper.pause();
        // Create a temp array with merged array
        const temp: number[] = [];
        let i = lo,
            j = mid + 1;
        while (i <= mid && j <= hi) {
            if (this.helper.getValue(i) < this.helper.getValue(j)) {
                temp.push(this.helper.getValue(i++));
            } else {
                temp.push(this.helper.getValue(j++));
            }
        }
        if (i <= mid) {
            temp.push(
                ...[...this.list]
                    .slice(i, mid + 1)
                    .map((elem) => parseInt(elem.getAttribute("value") || "-1"))
            );
        }
        if (j <= hi) {
            temp.push(
                ...[...this.list]
                    .slice(j, hi + 1)
                    .map((elem) => parseInt(elem.getAttribute("value") || "-1"))
            );
        }
        // Copy temp array to original array
        for (let k = lo, l = 0; k <= hi; k++, l++) {
            this.helper.setValue(k, temp[l]);
        }
        await this.helper.removeCompare();
    }
}
