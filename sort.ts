import Helper from "./helper.js";

export default abstract class Sort {
    length: number;
    list: NodeListOf<HTMLElement>;
    helper: Helper;
    // constructor(time: number) {
    //     this.list = document.querySelectorAll(".bar");
    //     this.length = this.list.length;
    //     this.helper = new Helper(this.list, time);
    // }
    constructor(listHtml: NodeListOf<HTMLElement>, helper: Helper) {
        this.list = listHtml;
        this.helper = helper;
        this.length = this.list.length;
    }
    abstract sort(): Promise<void>
}



// export default class Sort {
//     length: number;
//     list: NodeListOf<HTMLElement>;
//     helper: Helper;

//     constructor(time: number) {
//         this.list = document.querySelectorAll(".bar");
//         this.length = this.list.length;
//         this.helper = new Helper(this.list, time);
//     }

//     BubbleSort = async (): Promise<void> => {
//         for (let i = 0; i < this.length - 1; i++) {
//             for (let j = 0; j < this.length - 1; j++) {
//                 await this.helper.compare(j, j + 1);
//             }
//             this.helper.markDone(this.length - 1 - i);
//         }
//         this.helper.markDone(0);
//     };

//     InsertionSort = async (): Promise<void> => {
//         let sortedLen = 1;
//         for (let i = 1; i < this.length; i++) {
//             if (this.helper.getValue(i) < this.helper.getValue(sortedLen - 1)) {
//                 for (let j = i; j > 0; j--) {
//                     await this.helper.compare(j - 1, j);
//                 }
//             }
//             sortedLen++;
//         }
//         /* elements are not fully sorted until
//         every element has been iterated */
//         for (let k = 0; k < sortedLen; k++) {
//             this.helper.markDone(k);
//         }
//     };

//     SelectionSort = async (): Promise<void> => {
//         /* length - 1 because if (n-1) elements have all been the "minimum value"
//         nth should be sorted by default */
//         let minIndex = 0;
//         for (let i = 0; i < this.length; i++) {
//             let min = this.helper.getValue(i);
//             minIndex = i;
//             // get min value
//             for (let j = i + 1; j < this.length; j++) {
//                 //find smallest element
//                 if (this.helper.getValue(j) < min) {
//                     minIndex = j;
//                     min = this.helper.getValue(j);
//                 }
//             }
//             await this.helper.compare(i, minIndex);
//             this.helper.markDone(i);
//         }
//     };

//     MergeSort = async (lo: number, hi: number): Promise<void> => {
//         if (lo >= hi) {
//             return;
//         }
//         let mid = Math.floor((lo + hi) / 2);
//         await this.MergeSort(lo, mid);
//         await this.MergeSort(mid + 1, hi);
//         await this.Merge(lo, mid, hi);
//         if (lo == 0 && hi == this.length - 1) {
//             for (let k = 0; k < this.length; k++) {
//                 this.helper.markDone(k);
//             }
//         }
//     };

//     Merge = async (lo: number, mid: number, hi: number): Promise<void> => {
//         await this.helper.compareArray(lo, mid, hi);
//         await this.helper.pause();
//         // Create a temp array with merged array
//         const temp: number[] = [];
//         let i = lo,
//             j = mid + 1;
//         while (i <= mid && j <= hi) {
//             if (this.helper.getValue(i) < this.helper.getValue(j)) {
//                 temp.push(this.helper.getValue(i++));
//             } else {
//                 temp.push(this.helper.getValue(j++));
//             }
//         }
//         if (i <= mid) {
//             temp.push(
//                 ...[...this.list]
//                     .slice(i, mid + 1)
//                     .map((elem) => parseInt(elem.getAttribute("value") || "-1"))
//             );
//         }
//         if (j <= hi) {
//             temp.push(
//                 ...[...this.list]
//                     .slice(j, hi + 1)
//                     .map((elem) => parseInt(elem.getAttribute("value") || "-1"))
//             );
//         }
//         // Copy temp array to original array
//         for (let k = lo, l = 0; k <= hi; k++, l++) {
//             this.helper.setValue(k, temp[l]);
//         }
//         await this.helper.removeCompare();
//     };

//     QuickSort = async (arr: HTMLElement[]): Promise<void> => {
//         if (arr.length <= 1) {
//             arr.length == 1 && this.helper.markDone(0, arr);
//             return;
//         }
//         let index = await this.Partition(arr);
//         this.helper.markDone(index, arr);
//         await this.QuickSort(arr.slice(0, index));
//         await this.QuickSort(arr.slice(index + 1, arr.length));
//         return;
//     };

//     Partition = async (arr: HTMLElement[]): Promise<number> => {
//         //just ensures that every value left of the pivot is smaller
//         //and every value to the right is bigger (not necessarily sorted)
//         let pivot = this.helper.getValue(0, arr);
//         let i = 1,
//             j = arr.length - 1;
//         while (i < j) {
//             while (this.helper.getValue(i, arr) <= pivot && i != j) i++;
//             while (this.helper.getValue(j, arr) > pivot && i != j) j--;
//             // swaps and styles
//             if (i >= j) break;
//             await this.helper.quickSwap(i, j, arr);
//         }
//         // means i == j
//         // swap the pivot to it's sorted position
//         // edge case in quick sort if first element is the largest
//         // as i will be length and cause referenceerror in array
//         let sortedPos = pivot > this.helper.getValue(i, arr) ? i : i - 1;
//         await this.helper.quickSwap(0, sortedPos, arr);
//         return sortedPos;
//     };
// }
