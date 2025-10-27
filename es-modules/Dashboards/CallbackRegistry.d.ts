interface Callback {
    type: string;
    func: Function;
}
declare class CallbackRegistry {
    registry: Record<string, Callback>;
    addCallback(id: string, callback: Callback): void;
    getCallback(id: string): Callback;
}
export default CallbackRegistry;
