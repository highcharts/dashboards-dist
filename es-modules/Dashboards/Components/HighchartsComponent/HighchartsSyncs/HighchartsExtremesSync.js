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
import U from '../../../../Core/Utilities.js';
const { addEvent, isString } = U;
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
        const cleanupCallbacks = [];
        const { chart, board } = component;
        const connector = component.connectorHandlers?.[0]?.connector;
        const table = connector && connector.table;
        const syncOptions = this.sync.syncConfig.extremes;
        const groupKey = syncOptions.group ?
            ':' + syncOptions.group : '';
        const { dataCursor: cursor } = board;
        if (table && chart) {
            const extremesEventHandler = (e) => {
                const reset = !!e.resetSelection;
                if ((!e.trigger || (e.trigger && e.trigger !== 'dashboards-sync')) && !reset) {
                    // TODO: investigate this type?
                    const axis = e.target;
                    const seriesFromConnectorArray = Object.keys(component.seriesFromConnector);
                    // Prefer a series that's in a related table,
                    // but allow for other data
                    const series = seriesFromConnectorArray.length > 0 ?
                        chart.get(seriesFromConnectorArray[0]) :
                        axis.series[0];
                    if (series) {
                        // Get the indexes of the first and last drawn points
                        const visiblePoints = series.points.filter((point) => point.isInside || false);
                        const minCursorData = {
                            type: 'position',
                            state: `${axis.coll}.extremes.min${groupKey}`
                        };
                        const maxCursorData = {
                            type: 'position',
                            state: `${axis.coll}.extremes.max${groupKey}`
                        };
                        if (seriesFromConnectorArray.length > 0 &&
                            axis.coll === 'xAxis' &&
                            visiblePoints.length) {
                            let columnName;
                            const columnAssignment = (component.connectorHandlers[0]
                                ?.options).columnAssignment;
                            if (columnAssignment) {
                                const assignment = columnAssignment.find((assignment) => (assignment.seriesId ===
                                    series.options.id));
                                if (assignment) {
                                    const data = assignment.data;
                                    if (isString(data)) {
                                        columnName = data;
                                    }
                                    else if (Array.isArray(data)) {
                                        columnName = data[data.length - 1];
                                    }
                                    else {
                                        columnName = data.y;
                                    }
                                }
                            }
                            if (!columnName) {
                                columnName = axis.dateTime && (table.hasColumns(['x']) ? 'x' :
                                    series.options.id ?? series.name);
                            }
                            minCursorData.row = visiblePoints[0].index;
                            minCursorData.column = columnName;
                            maxCursorData.row =
                                visiblePoints[visiblePoints.length - 1].index;
                            maxCursorData.column = columnName;
                        }
                        // Emit as lasting cursors
                        cursor.emitCursor(table, minCursorData, e, true).emitCursor(table, maxCursorData, e, true);
                    }
                }
            };
            const addExtremesEvent = () => chart.axes.map((axis) => addEvent(axis, 'afterSetExtremes', extremesEventHandler));
            let addExtremesEventCallbacks = addExtremesEvent();
            const resetExtremesEvent = () => {
                addExtremesEventCallbacks.forEach((callback) => {
                    callback();
                });
                addExtremesEventCallbacks = [];
            };
            const handleChartResetSelection = (e) => {
                if (e.resetSelection) {
                    resetExtremesEvent();
                    cursor.emitCursor(table, {
                        type: 'position',
                        state: 'chart.zoomOut' + groupKey
                    }, e);
                    addExtremesEventCallbacks.push(...addExtremesEvent());
                }
            };
            cleanupCallbacks.push(addEvent(chart, 'selection', handleChartResetSelection));
            cleanupCallbacks.push(() => {
                cursor.remitCursor(table.id, {
                    type: 'position',
                    state: 'xAxis.extremes.min' + groupKey
                });
                cursor.remitCursor(table.id, {
                    type: 'position',
                    state: 'xAxis.extremes.max' + groupKey
                });
                resetExtremesEvent();
            });
        }
        // Return cleanup
        return function () {
            // Call back the cleanup callbacks
            cleanupCallbacks.forEach((callback) => {
                callback();
            });
        };
    },
    handler: function () {
        if (this.type !== 'Highcharts') {
            return;
        }
        const component = this;
        const syncOptions = this.sync.syncConfig.extremes;
        const groupKey = syncOptions.group ?
            ':' + syncOptions.group : '';
        const { chart, board } = component;
        if (chart && board && chart.zooming?.type) {
            const dimensions = chart.zooming.type.split('')
                .map((c) => c + 'Axis');
            const unregisterCallbacks = [];
            dimensions.forEach((dimension) => {
                const handleUpdateExtremes = (e) => {
                    const { cursor, event } = e;
                    if (cursor.type === 'position') {
                        const eventTarget = event?.target;
                        if (eventTarget && chart) {
                            const axes = chart[dimension];
                            let didZoom = false;
                            axes.forEach((axis) => {
                                if (eventTarget.coll === axis.coll &&
                                    eventTarget !== axis &&
                                    eventTarget.min !== null &&
                                    eventTarget.max !== null && (axis.max !== eventTarget.max ||
                                    axis.min !== eventTarget.min)) {
                                    axis.setExtremes(eventTarget.min, eventTarget.max, false, void 0, {
                                        trigger: 'dashboards-sync'
                                    });
                                    didZoom = true;
                                }
                            });
                            if (didZoom && !chart.resetZoomButton) {
                                chart.showResetZoom();
                            }
                            chart.redraw();
                        }
                    }
                };
                const addCursorListeners = () => {
                    const { dataCursor: cursor } = board;
                    const connector = component.connectorHandlers?.[0]?.connector;
                    if (connector) {
                        const { table } = connector;
                        cursor.addListener(table.id, `${dimension}.extremes.min${groupKey}`, handleUpdateExtremes);
                        cursor.addListener(table.id, `${dimension}.extremes.max${groupKey}`, handleUpdateExtremes);
                        const handleChartZoomOut = () => {
                            chart.zoomOut();
                            setTimeout(() => {
                                // Workaround for zoom button not being removed
                                const resetZoomButtons = component.element
                                    .querySelectorAll('.highcharts-reset-zoom');
                                resetZoomButtons.forEach((button) => {
                                    button.remove();
                                });
                            });
                        };
                        cursor.addListener(table.id, 'chart.zoomOut', handleChartZoomOut);
                        unregisterCallbacks.push(() => {
                            cursor.removeListener(table.id, `${dimension}.extremes.min${groupKey}`, handleUpdateExtremes);
                            cursor.removeListener(table.id, `${dimension}.extremes.max${groupKey}`, handleUpdateExtremes);
                            cursor.removeListener(table.id, 'chart.zoomOut' + groupKey, handleChartZoomOut);
                        });
                    }
                };
                if (board) {
                    addCursorListeners();
                }
            });
            return function () {
                unregisterCallbacks.forEach((callback) => {
                    callback();
                });
            };
        }
    }
};
/* *
*
*  Default export
*
* */
export default { defaultOptions, syncPair };
