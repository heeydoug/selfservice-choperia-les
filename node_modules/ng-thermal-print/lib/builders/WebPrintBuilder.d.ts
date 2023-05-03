import { PrintBuilder } from './PrintBuilder';
export declare class WebPrintBuilder extends PrintBuilder {
    private builder;
    private request;
    constructor();
    init(): WebPrintBuilder;
    setJustification(value?: string): WebPrintBuilder;
    setBold(value?: boolean): WebPrintBuilder;
    setUnderline(value?: boolean): WebPrintBuilder;
    setInverse(value?: boolean): WebPrintBuilder;
    writeLine(value: string): WebPrintBuilder;
    setSize(size?: string): WebPrintBuilder;
    cut(type?: string): WebPrintBuilder;
    feed(lines?: number): WebPrintBuilder;
    flush(): string;
}
