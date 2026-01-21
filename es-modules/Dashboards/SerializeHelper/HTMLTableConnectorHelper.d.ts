import type { JSONObject } from '../JSON';
import type HTMLTableConnectorOptions from '../../Data/Connectors/HTMLTableConnectorOptions';
import type HTMLTableConverterOptions from '../../Data/Converters/HTMLTableConverterOptions';
import HTMLTableConnector from '../../Data/Connectors/HTMLTableConnector.js';
import type { Helper as SerializableHelper, JSON as SerializableJSON } from '../Serializable';
export interface JSON extends SerializableJSON<'Data.HTMLTableConnector'> {
    options: OptionsJSON;
}
export type OptionsJSON = JSONObject & HTMLTableConnectorOptions & HTMLTableConverterOptions;
declare const HTMLTableConnectorHelper: SerializableHelper<HTMLTableConnector, JSON>;
export default HTMLTableConnectorHelper;
