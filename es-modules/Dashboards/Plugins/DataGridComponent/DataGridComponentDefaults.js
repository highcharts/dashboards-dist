/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Karol Kolodziej
 *
 * */
'use strict';
import DataConverter from '../../../Data/Converters/DataConverter.js';
import DataGridSyncHandlers from './DataGridSyncHandlers.js';
import U from '../../../Core/Utilities.js';
const { uniqueKey } = U;
/* *
 *
 *  Constants
 *
 * */
const DataGridComponentDefaults = {
    dataGridClassName: 'dataGrid-container',
    dataGridID: 'dataGrid-' + uniqueKey(),
    dataGridOptions: {},
    editableOptions: [{
            name: 'connectorName',
            propertyPath: ['connector', 'id'],
            type: 'select'
        }],
    syncHandlers: DataGridSyncHandlers,
    onUpdate: (e, connector) => {
        const inputElement = e.target;
        if (inputElement) {
            const parentRow = inputElement
                .closest('.highcharts-datagrid-row');
            const cell = inputElement.closest('.highcharts-datagrid-cell');
            const converter = new DataConverter();
            if (parentRow &&
                parentRow instanceof HTMLElement &&
                cell &&
                cell instanceof HTMLElement) {
                const dataTableRowIndex = parentRow
                    .dataset.rowIndex;
                const { columnName } = cell.dataset;
                if (dataTableRowIndex !== void 0 &&
                    columnName !== void 0) {
                    const table = connector.table;
                    if (table) {
                        let valueToSet = converter
                            .asGuessedType(inputElement.value);
                        if (valueToSet instanceof Date) {
                            valueToSet = valueToSet.toString();
                        }
                        table.setCell(columnName, parseInt(dataTableRowIndex, 10), valueToSet);
                    }
                }
            }
        }
    }
};
/* *
 *
 *  Default Export
 *
 * */
export default DataGridComponentDefaults;
