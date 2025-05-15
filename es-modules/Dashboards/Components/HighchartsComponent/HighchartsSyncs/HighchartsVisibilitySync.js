/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
'use strict';
/* *
 *
 *  Constants
 *
 * */
const defaultOptions = {};
const syncPair = {
    emitter: function () {
        if (this.type !== 'Highcharts') {
            return;
        }
        const component = this;
        const syncOptions = this.sync.syncConfig.visibility;
        const groupKey = syncOptions.group ? ':' + syncOptions.group : '';
        const { chart, board } = component;
        const connector = this.getFirstConnector();
        if (!board || !chart) {
            return;
        }
        const table = connector?.table;
        if (table) { // Has a connector
            const { dataCursor: cursor } = board;
            const { series } = chart;
            series.forEach((series) => {
                series.update({
                    events: {
                        show: function () {
                            cursor.emitCursor(table, {
                                type: 'position',
                                state: 'series.show' + groupKey,
                                column: this.name
                            });
                        },
                        hide: function () {
                            cursor.emitCursor(table, {
                                type: 'position',
                                state: 'series.hide' + groupKey,
                                column: this.name
                            });
                        }
                    }
                }, false);
            });
            chart.redraw();
        }
        return function () {
            if (!chart || !chart.series?.length) {
                return;
            }
            chart.series.forEach((series) => {
                series.update({
                    events: {
                        show: void 0,
                        hide: void 0
                    }
                }, false);
            });
            chart.redraw();
        };
    },
    handler: function () {
        if (this.type !== 'Highcharts') {
            return;
        }
        const component = this;
        const syncOptions = this.sync.syncConfig.visibility;
        const groupKey = syncOptions.group ? ':' + syncOptions.group : '';
        const { board } = component;
        const findSeries = (seriesArray, name) => {
            for (const series of seriesArray) {
                if (series.name === name) {
                    return series;
                }
            }
        };
        const handleShow = (e) => {
            const chart = component.chart;
            if (!chart || !chart.series?.length) {
                return;
            }
            if (e.cursor.type === 'position' && e.cursor.column !== void 0) {
                const series = findSeries(chart.series, e.cursor.column);
                if (series) {
                    series.setVisible(true, true);
                }
            }
        };
        const handleHide = (e) => {
            const chart = component.chart;
            if (!chart || !chart.series?.length) {
                return;
            }
            if (e.cursor.type === 'position' && e.cursor.column !== void 0) {
                const series = findSeries(chart.series, e.cursor.column);
                if (series) {
                    series.setVisible(false, true);
                }
            }
        };
        const registerCursorListeners = () => {
            const { dataCursor } = board;
            if (!dataCursor) {
                return;
            }
            const table = component.connectorHandlers?.[0]?.connector?.table;
            if (!table) {
                return;
            }
            dataCursor.addListener(table.id, 'series.show' + groupKey, handleShow);
            dataCursor.addListener(table.id, 'series.hide' + groupKey, handleHide);
        };
        const unregisterCursorListeners = () => {
            const table = component.connectorHandlers?.[0]?.connector?.table;
            if (table) {
                board.dataCursor.removeListener(table.id, 'series.show' + groupKey, handleShow);
                board.dataCursor.removeListener(table.id, 'series.hide' + groupKey, handleHide);
            }
        };
        if (board) {
            registerCursorListeners();
            return unregisterCursorListeners;
        }
    }
};
/* *
*
*  Default export
*
* */
export default { defaultOptions, syncPair };
