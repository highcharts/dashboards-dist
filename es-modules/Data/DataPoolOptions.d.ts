import type { DataConnectorTypes } from './Connectors/DataConnectorType.js';
export interface DataPoolOptions {
    connectors: Array<DataPoolConnectorOptions>;
}
export interface DataPoolConnectorOptions<T extends keyof DataConnectorTypes = keyof DataConnectorTypes> {
    id: string;
    options: DataConnectorTypes[T]['prototype']['options'];
    type: T;
}
export default DataPoolOptions;
