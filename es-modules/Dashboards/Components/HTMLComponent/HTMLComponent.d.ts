import type Cell from '../../Layout/Cell.js';
import type Options from './HTMLComponentOptions';
import Component from '../Component.js';
/**
 *
 * Class that represents a HTML component.
 *
 */
declare class HTMLComponent extends Component {
    /**
     * Default options of the HTML component.
     */
    static defaultOptions: Partial<Component.Options> & import("../../Globals.js").default.DeepPartial<Options>;
    /**
     * Predefined sync config for HTML component.
     */
    static predefinedSyncConfig: import("../Sync/Sync.js").default.PredefinedSyncConfig;
    /**
     * Creates component from JSON.
     *
     * @param json
     * Set of component options, used for creating the HTML component.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @returns
     * HTML component based on config from JSON.
     *
     * @internal
     */
    static fromJSON(json: HTMLComponent.ClassJSON, cell: Cell): HTMLComponent;
    /**
     * Array of HTML elements, declared as string or node.
     */
    private elements;
    /**
     * HTML component's options.
     */
    options: Options;
    /**
     * Creates a HTML component in the cell.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell: Cell, options: Partial<Options>);
    /** @internal */
    load(): Promise<this>;
    render(): this;
    resize(width?: number | string | null, height?: number | string | null): this;
    /**
     * Handles updating via options.
     *
     * @param options
     * The options to apply.
     */
    update(options: Partial<Options>, shouldRerender?: boolean): Promise<void>;
    getOptionsOnDrop(): Partial<Options>;
    /**
     * @internal
     */
    private constructTree;
    /**
     * When HTML definition is a string, it needs to be parsed to AST.
     *
     * @internal
     */
    private getElementsFromString;
    /**
     * Converts the class instance to a class JSON.
     *
     * @returns
     * Class JSON of this Component instance.
     *
     * @internal
     */
    toJSON(): HTMLComponent.ClassJSON;
    /**
     * Get the HTML component's options.
     * @returns
     * The JSON of HTML component's options.
     *
     * @internal
     *
     */
    getOptions(): Partial<Options>;
    /**
     * Retrieves editable options for the HTML component.
     */
    getEditableOptions(): Options;
    /**
     * Get the value of the editable option by property path. Parse the elements
     * if the HTML options is not set.
     *
     * @param propertyPath
     * The property path of the option.
     */
    getEditableOptionValue(propertyPath?: string[]): number | boolean | undefined | string;
    /**
     * Returns the HTML string from the given elements.
     *
     * @param elements
     * The array of elements to serialize.
     */
    private getStringFromElements;
    /**
     * Serializes the HTML node to string.
     *
     * @param node
     * The HTML node to serialize.
     */
    private serializeNode;
    /**
     * @internal
     */
    onTableChanged(e: Component.EventTypes): void;
}
declare namespace HTMLComponent {
    /** @internal */
    type ComponentType = HTMLComponent;
    /** @internal */
    interface HTMLComponentOptionsJSON extends Component.ComponentOptionsJSON {
        type: 'HTML';
    }
    /** @internal */
    type HTMLComponentEvents = Component.EventTypes | JSONEvent;
    /** @internal */
    type JSONEvent = Component.Event<'toJSON' | 'fromJSON', {
        json: HTMLComponent.ClassJSON;
    }>;
    /** @internal */
    interface ClassJSON extends Component.JSON {
        elements?: string[];
        events?: string[];
        options: HTMLComponentOptionsJSON;
    }
}
declare module '../ComponentType' {
    interface ComponentTypeRegistry {
        HTML: typeof HTMLComponent;
    }
}
export default HTMLComponent;
