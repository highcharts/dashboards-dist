import type DataModifier from '../../Data/Modifiers/DataModifier';
import Component from './Component';
import DataTable from '../../Data/DataTable.js';
declare module '../../Data/Connectors/DataConnector' {
    export default interface DataConnector {
        /**
         * Components that are fed by the connector.
         * @internal
         */
        components?: Component[];
    }
}
/**
 * A class that handles the connection between the component and the data
 * connector.
 */
declare class ConnectorHandler {
    /**
     * Connector options for the component.
     */
    options: ConnectorHandler.ConnectorOptions;
    /**
     * Connector that allows you to load data via URL or from a local source.
     */
    connector?: Component.ConnectorTypes;
    /**
     * The id of the connector configuration in the data pool of the dashboard.
     */
    connectorId?: string;
    /**
     * The component that the connector is tied to.
     */
    component: Component;
    /**
     * The interval for rendering the component on data changes.
     * @internal
     */
    private tableEventTimeout?;
    /**
     * Event listeners tied to the current DataTable. Used for rerendering the
     * component on data changes.
     *
     * @internal
     */
    private tableEvents;
    /**
     * DataModifier that is applied on top of modifiers set on the DataStore.
     *
     * @internal
     */
    presentationModifier?: DataModifier;
    /**
     * The table being presented, either a result of the above or a way to
     * modify the table via events.
     *
     * @internal
     */
    presentationTable?: DataTable;
    /**
     * Helper flag for detecting whether the connector handler has been
     * destroyed, used to check and prevent further operations if the connector
     * handler has been destroyed during asynchronous functions.
     */
    private destroyed?;
    /**
     * Creates an object that manages the data layer for the component.
     *
     * @param component
     * The component that the connector is tied to.
     *
     * @param options
     * The options for the connector.
     *
     */
    constructor(component: Component, options: ConnectorHandler.ConnectorOptions);
    /**
     * Inits connectors for the component and rerenders it.
     *
     * @returns
     * Promise resolving to the component.
     */
    initConnector(): Promise<Component>;
    /**
     * Sets the data table settings and events.
     *
     * @param table
     * The data table instance for settings and events.
     */
    setTable(table: DataTable): void;
    /**
     * Sets the connector for the component connector handler.
     *
     * @param connector
     * The connector to set.
     */
    setConnector(connector?: Component.ConnectorTypes): Component;
    /**
     * Adds event listeners to data table.
     * @param table
     * Data table that is source of data.
     * @internal
     */
    private setupTableListeners;
    /**
     * Remove event listeners in data table.
     *
     * @param table
     * The connector data table (data source).
     *
     * @internal
     */
    private clearTableListeners;
    /**
     * Adds the component to the provided connector.
     * Starts the connector polling if inactive and one component is provided.
     */
    private addConnectorAssignment;
    /**
     * Removes the component instance from the provided connector.
     * Stops the connector polling if the last element is removed.
     */
    private removeConnectorAssignment;
    /**
     * Clears all event listeners in the table.
     */
    private removeTableEvents;
    /**
     * Updates the options for the connector handler.
     *
     * @param newOptions
     * The new options to update.
     */
    updateOptions(newOptions: ConnectorHandler.ConnectorOptions): void;
    /**
     * Destroys the connector handler.
     * @internal
     */
    destroy(): void;
}
declare namespace ConnectorHandler {
    /**
     * Contains information to connect the component to a connector in the data
     * pool of the dashboard.
     */
    interface ConnectorOptions {
        /**
         * Whether to allow the transfer of data changes back to the connector
         * source.
         *
         * @internal
         */
        allowSave?: boolean;
        /**
         * The id of the connector configuration in the data pool of the
         * dashboard.
         */
        id: string;
        /**
         * The modifier to apply to the data table before presenting it. This
         * can be changed to be an open, documented option in the future.
         *
         * @internal
         */
        presentationModifier?: DataModifier;
        /**
         * Reference to the specific connector data table.
         */
        dataTableKey?: string;
    }
}
export default ConnectorHandler;
