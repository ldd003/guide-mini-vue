export declare class ReactiveEffect {
    constructor(fn: any, scheduler: any);
    run(): any;
    stop(): void;
}
export declare function effect(fn: any, options?: {}): () => any;
export declare function track(target: any, key: any): void;
export declare function trackEffect(dep: any): void;
export declare function isTracking(): any;
export declare function trigger(target: any, key: any): void;
export declare function triggerEffect(dep: any): void;
export declare function stop(runner: any): void;
//# sourceMappingURL=effect.d.ts.map