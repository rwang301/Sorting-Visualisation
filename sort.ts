import Helper from "./helper.js";

export default class Sort {
    length: number;
    list: NodeListOf<HTMLElement>;
    helper: Helper;

    constructor() {
        this.list = document.querySelectorAll(".bar");
        this.length = this.list.length;
        this.helper = new Helper(this.list);
    }

    BubbleSort = async (): Promise<void> => {
        for (let i = 0; i < this.length - 1; i++) {
            for (let j = 0; j < this.length - 1; j++) {
                this.helper.compare(j, j + 1);
            }
        }
    };

    lawton = (): NodeListOf<Element> => {
        return this.list;
    };
}
