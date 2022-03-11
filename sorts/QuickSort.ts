import Helper from "../helper.js";
import Sort from "../sort.js";

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
        try {
            let index = await this.partition(arr);
            this.helper.markDone(index, arr);
            await this.quickSort(arr.slice(0, index));
            await this.quickSort(arr.slice(index + 1, arr.length));
        } catch (error) {
            console.error(error);
        }
        return;
    }

    private async partition(arr: HTMLElement[]): Promise<number> {
        //just ensures that every value left of the pivot is smaller
        //and every value to the right is bigger (not necessarily sorted)
        let pivot = this.helper.getValue(0, arr);
        if (!pivot) throw new Error('Unable to get pivot value');
        let i = 1,
            j = arr.length - 1;
        while (i < j) {
            let iterator;
            while (i != j) {
                // while (this.helper.getValue(i, arr) <= pivot && i != j) i++;
                // while (this.helper.getValue(j, arr) > pivot && i != j) j--;
                iterator = this.helper.getValue(i, arr);
                if (iterator && iterator > pivot) {
                    break;
                }
                i++;
            }

            while (i != j) {
                iterator = this.helper.getValue(j, arr);
                if (iterator && iterator <= pivot) {
                    break;
                }
                j--;
            }

            // swaps and styles
            if (i >= j) break;
            await this.quickSwap(i, j, arr);
        }
        // means i == j
        // swap the pivot to it's sorted position
        // edge case in quick sort if first element is the largest
        // as i will be length and cause referenceerror in array
        const indexStoppedAt = this.helper.getValue(i, arr);
        if (!indexStoppedAt) throw new Error('Unable to get value');
        let sortedPos = pivot > indexStoppedAt ? i : i - 1;
        await this.quickSwap(0, sortedPos, arr);
        return sortedPos;
    };

    private async quickSwap(i: number, j: number, arr: HTMLElement[]): Promise<void> {
        let temp = arr[i].style.height;
        let tempVal = this.helper.getValue(i, arr);
        arr[i].classList.add("comparing");
        arr[j].classList.add("comparing");
        await this.helper.pause();
        arr[i].style.height = arr[j].style.height;
        arr[i].setAttribute("value", arr[j].getAttribute("value") || "");
        arr[j].style.height = temp;
        arr[j].setAttribute("value", `${tempVal}` || "");
        arr[i].classList.remove("comparing");
        arr[j].classList.remove("comparing");
    }
}
