declare class refImpl {
    constructor(val: any);
    get value(): any;
    set value(newVal: any);
}
export declare function ref(val: any): refImpl;
export declare function isRef(val: any): boolean;
export declare function unRef(val: any): any;
export declare function proxyRefs(obj: any): any;
export {};
//# sourceMappingURL=ref.d.ts.map