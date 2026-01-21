import type ChainModifierOptions from '../../Data/Modifiers/ChainModifierOptions';
import type { DataModifierTypeOptions } from '../../Data/Modifiers/DataModifierType';
import type { JSONObject } from '../JSON';
import ChainModifier from '../../Data/Modifiers/ChainModifier.js';
import type { Helper as SerializableHelper, JSON as SerializableJSON } from '../Serializable';
export type ChainJSON = (SerializableJSON<string> & DataModifierTypeOptions);
export interface JSON extends SerializableJSON<'Data.ChainModifier'> {
    chain: Array<ChainJSON>;
    options: OptionsJSON;
}
export type OptionsJSON = (JSONObject & ChainModifierOptions);
declare const ChainModifierHelper: SerializableHelper<ChainModifier, JSON>;
export default ChainModifierHelper;
