import type { ConnectorTypes as ComponentConnectorTypes } from './Component';
import Component from './Component';
import DataTable from '../../Data/DataTable.js';
declare module '../../Data/Connectors/DataConnector' {
    export default interface DataConnector {
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
    options: ConnectorOptions;
    /**
     * Data connector instance that is used in this connector handler.
     */
    connector?: ComponentConnectorTypes;
    /**
     * The ID of the data connector configuration in the data pool of the
     * dashboard.
     */
    connectorId?: string;
    /**
     * The component that the connector is tied to.
     */
    component: Component;
    /**
     * The data table bound to the connector handler.
     */
    dataTable?: DataTable;
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
    constructor(component: Component, options: ConnectorOptions);
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
    private setTable;
    /**
     * Sets the connector for the component connector handler.
     *
     * @param connector
     * The connector to set.
     */
    setConnector(connector?: ComponentConnectorTypes): Component;
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
    updateOptions(newOptions: ConnectorOptions): void;
}
/**
 * Contains information to connect the component to a connector in the data
 * pool of the dashboard.
 */
export interface ConnectorOptions {
    /**
     * The id of the connector configuration in the data pool of the
     * dashboard.
     */
    id: string;
    /**
     * Reference to the specific connector data table.
     */
    dataTableKey?: string;
}
export default ConnectorHandler;
