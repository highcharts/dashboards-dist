import type DataTableOptions from '../../Data/DataTableOptions';
import type { JSONArray, JSONPrimitive } from '../JSON';
import DataTable from '../../Data/DataTable.js';
import type { Helper as SerializableHelper, JSON as SerializableJSON } from '../Serializable';
export type ColumnJSON = JSONArray<JSONPrimitive>;
export type JSON = (SerializableJSON<'Data.DataTable'> & DataTableOptions);
declare const DataTableHelper: SerializableHelper<DataTable, JSON>;
export default DataTableHelper;
