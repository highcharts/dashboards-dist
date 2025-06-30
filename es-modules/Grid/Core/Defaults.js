/* *
 *
 *  Grid default options
 *
 *  (c) 2009-2025 Highsoft AS
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
import Utils from '../../Core/Utilities.js';
const { merge } = Utils;
/**
 * Namespace for default options.
 */
var Defaults;
(function (Defaults) {
    /**
     * Default options for the Grid.
     * @internal
     */
    Defaults.defaultOptions = {
        accessibility: {
            enabled: true,
            highContrastMode: 'auto',
            announcements: {
                sorting: true
            }
        },
        lang: {
            accessibility: {
                sorting: {
                    sortable: 'Sortable.',
                    announcements: {
                        ascending: 'Sorted ascending.',
                        descending: 'Sorted descending.',
                        none: 'Not sorted.'
                    }
                }
            },
            loading: 'Loading...',
            noData: 'No data to display'
        },
        time: {
            timezone: 'UTC'
        },
        rendering: {
            rows: {
                bufferSize: 10,
                minVisibleRows: 2,
                strictHeights: false,
                virtualizationThreshold: 50
            },
            header: {
                enabled: true
            },
            columns: {
                resizing: {
                    enabled: true
                }
            },
            theme: 'hcg-theme-default'
        },
        columnDefaults: {
            sorting: {
                sortable: true
            }
        }
    };
    /**
     * Merge the default options with custom options. Commonly used for defining
     * reusable templates.
     *
     * @param options
     * The new custom chart options.
     */
    function setOptions(options) {
        merge(true, Defaults.defaultOptions, options);
    }
    Defaults.setOptions = setOptions;
})(Defaults || (Defaults = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Defaults;
