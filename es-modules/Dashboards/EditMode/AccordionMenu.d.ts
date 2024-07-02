import type Component from '../Components/Component';
import type EditableOptions from '../Components/EditableOptions';
/**
 * Accordion menu class.
 */
declare class AccordionMenu {
    constructor(iconsURLPrefix: string, closeSidebar: Function);
    private iconsURLPrefix;
    private closeSidebar;
    private changedOptions;
    private chartOptionsJSON;
    private component?;
    private oldOptionsBuffer;
    private confirmationPopup?;
    waitingForConfirmation: boolean;
    /**
     * Renders the menu for given component.
     *
     * @param container
     * The HTML Element to render the menu in.
     *
     * @param component
     * The component to render the menu for.
     */
    renderContent(container: HTMLElement, component: Component): void;
    /**
     * Update the options object with new nested value, based on the property
     * path. If the objects in the path are not defined, the function will
     * create them.
     *
     * @param propertyPath
     * Path of the property for which the value should be updated.
     * Example: ```['chartOptions', 'chart', 'type']```
     *
     * @param value
     * New value of the property.
     */
    updateOptions(propertyPath: Array<string>, value: boolean | string | number): void;
    /**
     * Renders either a basic or nested element. This function can be
     * recursively called, if there are multiple nested options.
     *
     * @param options
     * Configuration object of the Component options.
     *
     * @param parentNode
     * A container where the accordion is rendered.
     *
     * @param component
     * the component for which the menu should be rendered.
     */
    renderAccordion(options: EditableOptions.Options, parentNode: HTMLElement, component: Component): void;
    /**
     * Render nested menu for the component.
     *
     * @param parentElement
     * HTML element to which the nested structure should be rendered to
     *
     * @param options
     * configuration object for the options
     *
     * @param component
     * The component instance for the options should be rendered
     */
    renderNested(parentElement: HTMLElement, options: EditableOptions.Options, component: Component): void;
    /**
     * Closes the sidebar discarding changes. If there are any changes, it will
     * show a confirmation popup. If no changes, it will close the sidebar.
     */
    cancelChanges(): void;
    /**
     * Confirms changes made in the component.
     *
     * @fires EditMode#componentChanged
     */
    private confirmChanges;
    /**
     * Discards changes made in the component.
     *
     * @fires EditMode#componentChangesDiscarded
     */
    private discardChanges;
    /**
     * Shows a confirmation popup when the user tries to discard changes.
     */
    private showCancelConfirmationPopup;
}
export default AccordionMenu;
