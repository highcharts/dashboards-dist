import type Component from '../Component';
export type EmitterFunction = (this: Component) => Function | void;
export default SyncEmitter;
