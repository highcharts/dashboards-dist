import type InvertModifierOptions from '../../Data/Modifiers/InvertModifierOptions';
import type { JSONObject } from '../JSON';
import InvertModifier from '../../Data/Modifiers/InvertModifier';
import type { Helper as SerializableHelper, JSON as SerializableJSON } from '../Serializable';
export interface JSON extends SerializableJSON<'Data.InvertModifier'> {
    options: OptionsJSON;
}
export type OptionsJSON = (JSONObject & InvertModifierOptions);
declare const InvertModifierHelper: SerializableHelper<InvertModifier, JSON>;
export default InvertModifierHelper;
