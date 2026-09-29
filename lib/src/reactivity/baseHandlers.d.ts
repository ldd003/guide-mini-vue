export declare const mutableHandler: {
    get: (target: any, key: any, receiver: any) => any;
    set: (target: any, key: any, value: any, receiver: any) => boolean;
};
export declare const readonlyHandler: {
    get: (target: any, key: any, receiver: any) => any;
    set(target: any, key: any): boolean;
};
export declare const shallowReadonlyHandler: {
    get: (target: any, key: any, receiver: any) => any;
    set(target: any, key: any): boolean;
} & {
    get: (target: any, key: any, receiver: any) => any;
};
//# sourceMappingURL=baseHandlers.d.ts.map