import type { JSONObject } from '../JSON';
import type CSVConnectorOptions from '../../Data/Connectors/CSVConnectorOptions';
import CSVConnector from '../../Data/Connectors/CSVConnector.js';
import type { Helper as SerializableHelper, JSON as SerializableJSON } from '../Serializable';
export interface JSON extends SerializableJSON<'Data.CSVConnector'> {
    options: OptionsJSON;
}
export type OptionsJSON = (JSONObject & CSVConnectorOptions);
declare const CSVConnectorHelper: SerializableHelper<CSVConnector, JSON>;
export default CSVConnectorHelper;
