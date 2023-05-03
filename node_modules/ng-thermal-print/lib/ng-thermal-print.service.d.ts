import { PrintBuilder } from './builders/PrintBuilder';
import { BehaviorSubject } from 'rxjs';
import { PrintDriver } from './drivers/PrintDriver';
export declare class PrintService extends PrintBuilder {
    printLanguage: string;
    driver: PrintDriver;
    isConnected: BehaviorSubject<boolean>;
    builder: PrintBuilder;
    constructor();
    /**
     *
     * @param driver UsbDriver | WebPrintDriver
     * @param printLanguage ESC/POS | StarPRNT | WebPRNT
     */
    setDriver(driver: PrintDriver, printLanguage?: string): PrintService;
    /**
     * Initialize a new print queue
     */
    init(): PrintService;
    /**
     *
     * @param cutType full|partial
     */
    cut(cutType?: string): PrintService;
    /**
     *
     * @param lineCount How many lines to feed
     */
    feed(lineCount?: number): PrintService;
    setInverse(value?: boolean): PrintService;
    setBold(value?: boolean): PrintService;
    setUnderline(value?: boolean): PrintService;
    /**
     *
     * @param value left|center\right
     */
    setJustification(value?: string): PrintService;
    /**
     *
     * @param value normal|large
     */
    setSize(value?: string): PrintService;
    /**
     *
     * @param text
     */
    writeLine(text?: string): PrintService;
    /**
     * write the current builder value to the driver and clear out the builder
     */
    flush(): void;
}
