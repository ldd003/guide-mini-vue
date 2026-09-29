export declare const extend: {
    <T extends {}, U>(target: T, source: U): T & U;
    <T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
    <T extends {}, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
    (target: object, ...sources: any[]): any;
};
export declare const isObject: (val: any) => boolean;
export declare const hasChanged: (newVal: any, oldVal: any) => boolean;
export declare function hasOwn(obj: {} | undefined, key: any): boolean;
//# sourceMappingURL=index.d.ts.map