import { PrintBuilder } from './PrintBuilder';
export declare class StarPrintBuilder extends PrintBuilder {
    private encoder;
    private buffer;
    constructor();
    init(): StarPrintBuilder;
    flush(): Uint8Array;
    feed(lineCount?: number): StarPrintBuilder;
    cut(cutType?: string): StarPrintBuilder;
    writeLine(value: string): StarPrintBuilder;
    setInverse(inverse?: boolean): StarPrintBuilder;
    setUnderline(underline?: boolean): StarPrintBuilder;
    setJustification(value: string): StarPrintBuilder;
    setBold(bold?: boolean): StarPrintBuilder;
    setSize(size: string): StarPrintBuilder;
    private write;
}
