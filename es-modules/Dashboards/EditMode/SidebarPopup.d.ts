import type ComponentType from '../Components/ComponentType';
import type EditMode from './EditMode';
import type Row from '../Layout/Row';
import CellHTML from '../Layout/CellHTML.js';
import AccordionMenu from './AccordionMenu.js';
import BaseForm from '../../Shared/BaseForm.js';
import Cell from '../Layout/Cell.js';
/**
 * Class which creates the sidebar and handles its behavior.
 *
 * @internal
 */
declare class SidebarPopup extends BaseForm {
    static readonly addRow: {
        text: string;
        onDrop: (sidebar: SidebarPopup, dropContext: Cell | Row) => Cell | void;
    };
    /**
     * Constructor of the SidebarPopup class.
     *
     * @param parentDiv
     * Element to which the sidebar will be appended.
     *
     * @param iconsURL
     * URL to the icons.
     *
     * @param editMode
     * Instance of EditMode.
     */
    constructor(parentDiv: HTMLElement, iconsURL: string, editMode: EditMode);
    /**
     * Reference to the AccordionMenu.
     */
    accordionMenu: AccordionMenu;
    /**
     * Instance of EditMode.
     */
    editMode: EditMode;
    /**
     * Options used in the sidebar.
     */
    options: SidebarPopup.Options;
    /**
     * Whether the sidebar is visible.
     */
    isVisible: boolean;
    /**
     * List of components that can be added to the board.
     */
    private componentsList;
    /**
     * Function to detect on which side of the screen should the sidebar be.
     *
     * @param context
     * The cell or row which is the context of the sidebar.
     *
     * @returns
     * Whether the sidebar should be on the right side of the screen.
     */
    private detectRightSidebar;
    /**
     * Function to remove the class names from the sidebar.
     */
    private removeClassNames;
    /**
     * Function to add the class names to the sidebar depending on the position
     * of the sidebar.
     *
     * @param isRightSidebar
     * Whether the sidebar should be on the right side of the screen.
     */
    private addClassNames;
    /**
     * Function to show the sidebar.
     *
     * @param context
     * The cell or row which is the context of the sidebar.
     */
    show(context?: Cell | CellHTML | Row): void;
    generateContent(context?: Cell | Row | CellHTML): void;
    renderAddComponentsList(): void;
    onDropNewComponent(dropContext: Cell | Row, componentOptions: Partial<ComponentType['options']>): Cell | void;
    /**
     * Function to hide the sidebar.
     */
    hide(): void;
    /**
     * Function called when the close button is pressed.
     *
     * @override BaseForm.closeButtonEvents
     */
    closeButtonEvents(): void;
    renderHeader(title: string, iconURL: string): void;
    /**
     * Based on the provided components list, it returns the list of components
     * with its names and functions that are called when the component is
     * dropped.
     *
     * @param components
     * List of components that can be added to the board.
     */
    private getComponentsList;
    /**
     * Function to create and add the close button to the sidebar.
     *
     * @param className
     * Class name of the close button.
     * @returns Close button element
     */
    protected addCloseButton(className?: string): HTMLElement;
    /**
     * Function that creates the container of the sidebar.
     *
     * @param parentDiv
     * The parent div to which the sidebar will be appended.
     * @param className
     * Class name of the sidebar.
     * @returns The container of the sidebar.
     */
    protected createPopupContainer(parentDiv: HTMLElement, className?: string): HTMLElement;
}
declare namespace SidebarPopup {
    /**
     * Options used to configure the sidebar.
     */
    interface Options {
        components?: Array<string>;
    }
    /**
     * Contains the name of the component and the function that is called when
     * the component is dropped.
     */
    interface AddComponentDetails {
        text: string;
        onDrop: Function;
    }
}
export default SidebarPopup;
