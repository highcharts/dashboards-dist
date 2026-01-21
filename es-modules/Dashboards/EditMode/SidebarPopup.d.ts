/**
 * Options used to configure the sidebar.
 */
export interface Options {
    components?: Array<string>;
}
/**
 * Contains the name of the component and the function that is called when
 * the component is dropped.
 */
export interface AddComponentDetails {
    text: string;
    onDrop: Function;
}
export default SidebarPopup;
