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

    lawton = (): NodeListOf<HTMLElement> => {
        return this.list;
    };
}
