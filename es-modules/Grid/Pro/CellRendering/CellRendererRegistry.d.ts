import type { CellRendererTypeRegistry } from './CellRendererType';
declare namespace CellRendererRegistry {
    /**
     * Record of cell renderer classes
     */
    const types: CellRendererTypeRegistry;
    /**
     * Method used to register new cell renderer classes.
     *
     * @param key
     * Registry key of the cell renderer class.
     *
     * @param CellRendererClass
     * Cell renderer class (aka class constructor) to register.
     */
    function registerRenderer<T extends keyof CellRendererTypeRegistry>(key: T, CellRendererClass: CellRendererTypeRegistry[T]): boolean;
}
export default CellRendererRegistry;
