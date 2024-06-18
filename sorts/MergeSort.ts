import Helper from "../helper.js";
import Sort from "../sort.js";

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
        try {
            await this.mergeSort(lo, mid);
            await this.mergeSort(mid + 1, hi);
            await this.mergeList(lo, mid, hi);
            if (lo == 0 && hi == this.length - 1) {
                for (let k = 0; k < this.length; k++) {
                    this.helper.markDone(k);
                }
            }
        } catch (error) {
            console.error(error);
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
            const valueOne = this.helper.getValue(i);
            const valueTwo = this.helper.getValue(j);
            if (valueOne && valueTwo) {
                if (valueOne < valueTwo) {
                    temp.push(valueOne);
                    i++;
                } else {
                    temp.push(valueTwo);
                    j++;
                }
            }
        }
        if (i <= mid) {
            temp.push(
                ...[...this.list]
                    .slice(i, mid + 1)
                    .map((elem) => this.parseElementToInt(elem))
            );
        }
        if (j <= hi) {
            temp.push(
                ...[...this.list]
                    .slice(j, hi + 1)
                    .map((elem) => this.parseElementToInt(elem))
            );
        }
        // Copy temp array to original array
        for (let k = lo, l = 0; k <= hi; k++, l++) {
            this.helper.setValue(k, temp[l]);
        }
        await this.helper.removeCompare();
    }

    private parseElementToInt(elem: HTMLElement) {
        const stringValue = elem.getAttribute("value");
        const numValue = stringValue ? parseInt(stringValue) : null;
        if (numValue) return numValue;
        else throw new Error('Unable to merge');
    }

}
