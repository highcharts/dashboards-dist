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
