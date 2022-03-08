import Helper from "../Helper.js";
import Sort from "../Sort.js";

export default class QuickSort extends Sort {
    constructor(listHtml: NodeListOf<HTMLElement>, helper: Helper) {
        super(listHtml, helper);
    }
    async sort(): Promise<void> {
        await this.quickSort([...this.list]);
    }
    
    private async quickSort(arr: HTMLElement[]): Promise<void> {
        if (arr.length <= 1) {
            arr.length == 1 && this.helper.markDone(0, arr);
            return;
        }
        let index = await this.partition(arr);
        this.helper.markDone(index, arr);
        await this.quickSort(arr.slice(0, index));
        await this.quickSort(arr.slice(index + 1, arr.length));
        return;
    }

    private async partition(arr: HTMLElement[]): Promise<number> {
        //just ensures that every value left of the pivot is smaller
        //and every value to the right is bigger (not necessarily sorted)
        let pivot = this.helper.getValue(0, arr);
        let i = 1,
            j = arr.length - 1;
        while (i < j) {
            while (this.helper.getValue(i, arr) <= pivot && i != j) i++;
            while (this.helper.getValue(j, arr) > pivot && i != j) j--;
            // swaps and styles
            if (i >= j) break;
            await this.helper.quickSwap(i, j, arr);
        }
        // means i == j
        // swap the pivot to it's sorted position
        // edge case in quick sort if first element is the largest
        // as i will be length and cause referenceerror in array
        let sortedPos = pivot > this.helper.getValue(i, arr) ? i : i - 1;
        await this.helper.quickSwap(0, sortedPos, arr);
        return sortedPos;
    };
}
