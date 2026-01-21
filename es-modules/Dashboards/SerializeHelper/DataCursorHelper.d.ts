import type { State as DataCursorState } from '../../Data/DataCursor.js';
import type { JSONArray, JSONObject } from '../JSON';
import DataCursor from '../../Data/DataCursor.js';
import type { Helper as SerializableHelper, JSON as SerializableJSON } from '../Serializable';
export type TypeJSON = (PositionJSON | RangeJSON);
export interface PositionJSON extends JSONObject {
    column?: string;
    row?: number;
    state: DataCursorState;
    sourceId?: string;
    type: 'position';
}
export interface RangeJSON extends JSONObject {
    columns?: Array<string>;
    firstRow: number;
    lastRow: number;
    state: DataCursorState;
    sourceId?: string;
    type: 'range';
}
export interface JSON extends SerializableJSON<'Data.DataCursor'> {
    stateMap: StateMapJSON;
}
export type StateMapJSON = JSONObject<JSONObject<JSONArray<TypeJSON>>>;
declare const DataCursorHelper: SerializableHelper<DataCursor, JSON>;
export default DataCursorHelper;
