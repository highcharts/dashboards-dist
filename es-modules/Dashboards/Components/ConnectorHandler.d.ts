import Component from './Component';
import type DataModifier from '../../Data/Modifiers/DataModifier';
import DataTable from '../../Data/DataTable.js';
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
     * @internal
     */
    private clearTableListeners;
    updateOptions(newOptions: ConnectorHandler.ConnectorOptions): void;
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
    }
}
export default ConnectorHandler;
