import Helper from "./helper.js";

export default class Sort {
    length: number;
    list: NodeListOf<HTMLElement>;
    helper: Helper;

    constructor(time: number) {
        this.list = document.querySelectorAll(".bar");
        this.length = this.list.length;
        this.helper = new Helper(this.list, time);
    }

    BubbleSort = async (): Promise<void> => {
        for (let i = 0; i < this.length - 1; i++) {
            for (let j = 0; j < this.length - 1; j++) {
                await this.helper.compare(j, j + 1);
            }
            this.helper.markDone(this.length - 1 - i);
        }
        this.helper.markDone(0);
    };

    InsertionSort = async (): Promise<void> => {
        let sortedLen = 1;
        for (let i = 1; i < this.length; i++) {
            if (this.helper.getValue(i) < this.helper.getValue(sortedLen - 1)) {
                for (let j = i; j > 0; j--) {
                    await this.helper.compare(j - 1, j);
                }
            }
            sortedLen++;
        }
    };

    lawton = (): NodeListOf<HTMLElement> => {
        return this.list;
    };
}
