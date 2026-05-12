import type { JSONObject } from '../JSON';
import type GoogleSheetsConnectorOptions from '../../Data/Connectors/GoogleSheetsConnectorOptions';
import type { Helper as SerializableHelper, JSON as SerializableJSON } from '../Serializable';
import GoogleSheetsConnector from '../../Data/Connectors/GoogleSheetsConnector.js';
export interface JSON extends SerializableJSON<'Data.GoogleSheetsConnector'> {
    options: OptionsJSON;
}
export type OptionsJSON = (JSONObject & GoogleSheetsConnectorOptions);
declare const GoogleSheetsConnectorHelper: SerializableHelper<GoogleSheetsConnector, JSON>;
export default GoogleSheetsConnectorHelper;
