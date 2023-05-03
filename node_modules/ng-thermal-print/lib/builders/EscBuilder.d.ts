import { PrintBuilder } from './PrintBuilder';
export declare class EscBuilder extends PrintBuilder {
    private encoder;
    private buffer;
    constructor();
    init(): EscBuilder;
    flush(): Uint8Array;
    feed(lineCount?: number): EscBuilder;
    cut(cutType?: string): EscBuilder;
    writeLine(value: string): EscBuilder;
    setInverse(inverse?: boolean): EscBuilder;
    setUnderline(value?: boolean): EscBuilder;
    setJustification(value?: string): EscBuilder;
    setBold(bold?: boolean): EscBuilder;
    /**
    @param mode 0, 0x30
    */
    setSize(size?: string): EscBuilder;
    private write;
}
