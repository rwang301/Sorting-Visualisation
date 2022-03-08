import Helper from "./Helper.js";

export default abstract class Sort {
    length: number;
    list: NodeListOf<HTMLElement>;
    helper: Helper;
    constructor(listHtml: NodeListOf<HTMLElement>, helper: Helper) {
        this.list = listHtml;
        this.helper = helper;
        this.length = this.list.length;
    }
    abstract sort(): Promise<void>
}