/* *
 *
 *  Data Grid default options
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *  - Sebastian Bochan
 *
 * */
'use strict';
/* *
 *
 *  API Options
 *
 * */
const DefaultOptions = {
    rendering: {
        columns: {
            distribution: 'full'
        },
        rows: {
            bufferSize: 10,
            strictHeights: false
        },
        header: {
            enabled: true
        }
    },
    credits: {
        enabled: true,
        text: 'Highcharts.com',
        href: 'https://www.highcharts.com?credits',
        position: 'bottom'
    },
    columnDefaults: {
        sorting: {
            sortable: true
        },
        resizing: true
    }
};
/* *
 *
 *  Default Export
 *
 * */
export default DefaultOptions;
