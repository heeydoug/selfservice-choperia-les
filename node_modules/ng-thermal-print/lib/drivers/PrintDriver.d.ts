import { BehaviorSubject } from 'rxjs';
export declare abstract class PrintDriver {
    abstract isConnected: BehaviorSubject<boolean>;
    abstract connect(): void;
    abstract write(data: any): void;
}
