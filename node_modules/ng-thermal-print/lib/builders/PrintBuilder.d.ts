export declare abstract class PrintBuilder {
    abstract init(): any;
    /**
     *
     * @param cutType fill|partial
     */
    abstract cut(cutType: string): any;
    abstract flush(): any;
    abstract feed(lineCount: number): any;
    abstract setInverse(value: boolean): any;
    abstract setBold(value: boolean): any;
    /**
     *
     * @param value left\center\right
     */
    abstract setJustification(value: string): any;
    /**
     *
     * @param value normal\large
     */
    abstract setSize(value: string): any;
    abstract setUnderline(value: boolean): any;
    abstract writeLine(text: string): any;
}
