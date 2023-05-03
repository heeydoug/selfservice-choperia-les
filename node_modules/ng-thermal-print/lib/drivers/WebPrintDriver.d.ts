import { BehaviorSubject } from 'rxjs';
import { PrintDriver } from "./PrintDriver";
export declare class WebPrintDriver extends PrintDriver {
    isConnected: BehaviorSubject<boolean>;
    private trader;
    private url;
    private useSecure;
    isStarPrinter: boolean;
    constructor(url: string, useSecure?: boolean);
    connect(): void;
    write(data: string): Promise<void>;
}
