import type { JSONObject } from '../JSON';
import type JSONConnectorOptions from '../../Data/Connectors/JSONConnectorOptions';
import JSONConnector from '../../Data/Connectors/JSONConnector.js';
import type { Helper as SerializableHelper, JSON as SerializableJSON } from '../Serializable';
export interface JSON extends SerializableJSON<'Data.JSONConnector'> {
    options: OptionsJSON;
}
export type OptionsJSON = (JSONObject & JSONConnectorOptions);
declare const JSONConnectorHelper: SerializableHelper<JSONConnector, JSON>;
export default JSONConnectorHelper;
