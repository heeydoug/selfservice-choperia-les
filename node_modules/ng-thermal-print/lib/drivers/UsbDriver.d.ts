/// <reference types="w3c-web-usb" />
import { BehaviorSubject, Observable } from 'rxjs';
import { PrintDriver } from "./PrintDriver";
export declare class UsbDriver extends PrintDriver {
    private device;
    private endPoint;
    private vendorId;
    private productId;
    isConnected: BehaviorSubject<boolean>;
    constructor(vendorId?: number, productId?: number);
    connect(): void;
    /**
     * Request a USB device through the browser
     * return Observable<USBDevice>
     */
    requestUsb(): Observable<USBDevice>;
    write(data: Uint8Array): Promise<void>;
    private listenForUsbConnections;
}
