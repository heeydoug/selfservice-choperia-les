export declare class PrintBuffer {
    private buffer;
    private size;
    constructor(size?: number);
    clear(): void;
    flush(): Uint8Array;
    write(data: ArrayLike<number>): PrintBuffer;
    writeUInt8(value: number): PrintBuffer;
    private resize;
}
