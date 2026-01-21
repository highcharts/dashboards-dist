import type { JSONObject } from '../JSON';
import DataConverter, { type Options as DataConverterOptions } from '../../Data/Converters/DataConverter.js';
import type { Helper as SerializableHelper, JSON as SerializableJSON } from '../Serializable';
export interface JSON extends SerializableJSON<'Data.DataConverter'> {
    options: OptionsJSON;
}
export type OptionsJSON = (JSONObject & DataConverterOptions);
declare const DataConverterHelper: SerializableHelper<DataConverter, JSON>;
export default DataConverterHelper;
