/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
/* eslint-disable require-jsdoc, max-len */
'use strict';
import U from '../../../Core/Utilities.js';
const { addEvent, isString } = U;
/**
 * Utility function that returns the first row index
 * if the table has been modified by a range modifier
 *
 * @param {DataTable} table
 * The table to get the offset from.
     *
 * @param {RangeModifierOptions} modifierOptions
 * The modifier options to use
 *
 * @return {number}
 * The row offset of the modified table.
 */
function getModifiedTableOffset(table, modifierOptions) {
    const { ranges } = modifierOptions;
    if (ranges) {
        const minRange = ranges.reduce((minRange, currentRange) => {
            if (currentRange.minValue > minRange.minValue) {
                minRange = currentRange;
            }
            return minRange;
        }, ranges[0]);
        const tableRowIndex = table.getRowIndexBy(minRange.column, minRange.minValue);
        if (tableRowIndex) {
            return tableRowIndex;
        }
    }
    return 0;
}
/* *
 *
 *  Constants
 *
 * */
const configs = {
    emitters: {
        highlightEmitter: function () {
            if (this.type !== 'Highcharts') {
                return;
            }
            const { chart, board } = this;
            const highlightOptions = this.sync.syncConfig.highlight;
            if (!highlightOptions.enabled) {
                return;
            }
            const { dataCursor: cursor } = board;
            const table = this.connector && this.connector.table;
            if (chart?.series && table) {
                chart.series.forEach((series) => {
                    series.update({
                        point: {
                            events: {
                                // Emit table cursor
                                mouseOver: function () {
                                    let offset = 0;
                                    const modifier = table.getModifier();
                                    if (modifier?.options.type === 'Range') {
                                        offset = getModifiedTableOffset(table, modifier.options);
                                    }
                                    cursor.emitCursor(table, {
                                        type: 'position',
                                        row: offset + this.index,
                                        column: series.name,
                                        state: 'point.mouseOver'
                                    });
                                },
                                mouseOut: function () {
                                    let offset = 0;
                                    const modifier = table.getModifier();
                                    if (modifier?.options.type === 'Range') {
                                        offset = getModifiedTableOffset(table, modifier.options);
                                    }
                                    cursor.emitCursor(table, {
                                        type: 'position',
                                        row: offset + this.index,
                                        column: series.name,
                                        state: 'point.mouseOut'
                                    });
                                }
                            }
                        }
                    }, false);
                    chart.redraw();
                });
            }
            // Return function that handles cleanup
            return function () {
                if (chart && chart.series) {
                    chart.series.forEach((series) => {
                        series.update({
                            point: {
                                events: {
                                    mouseOver: void 0,
                                    mouseOut: void 0
                                }
                            }
                        }, false);
                    });
                    chart.redraw();
                }
            };
        },
        seriesVisibilityEmitter: function () {
            if (this.type !== 'Highcharts') {
                return;
            }
            const component = this;
            const { chart, connector, board } = component;
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
                                    state: 'series.show',
                                    column: this.name
                                });
                            },
                            hide: function () {
                                cursor.emitCursor(table, {
                                    type: 'position',
                                    state: 'series.hide',
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
        extremesEmitter: function () {
            if (this.type === 'Highcharts') {
                const component = this;
                const cleanupCallbacks = [];
                const { chart, connector, board } = component;
                const table = connector && connector.table;
                const { dataCursor: cursor } = board;
                if (table && chart) {
                    const extremesEventHandler = (e) => {
                        const reset = !!e.resetSelection;
                        if ((!e.trigger || (e.trigger && e.trigger !== 'dashboards-sync')) && !reset) {
                            // TODO: investigate this type?
                            const axis = e.target;
                            // Prefer a series that's in a related table,
                            // but allow for other data
                            const series = component.seriesFromConnector.length > 0 ?
                                chart.get(component.seriesFromConnector[0]) :
                                axis.series[0];
                            if (series) {
                                // Get the indexes of the first and last drawn points
                                const visiblePoints = series.points
                                    .filter((point) => point.isInside || false);
                                const minCursorData = {
                                    type: 'position',
                                    state: `${axis.coll}.extremes.min`
                                };
                                const maxCursorData = {
                                    type: 'position',
                                    state: `${axis.coll}.extremes.max`
                                };
                                if (component.seriesFromConnector.length > 0 &&
                                    axis.coll === 'xAxis' &&
                                    visiblePoints.length) {
                                    let columnName;
                                    const columnAssignment = component.options.connector?.columnAssignment;
                                    if (columnAssignment) {
                                        const assignment = columnAssignment.find((assignment) => assignment.seriesId === series.options.id);
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
                                        columnName = axis.dateTime && table.hasColumns(['x']) ?
                                            'x' :
                                            series.options.id ?? series.name;
                                    }
                                    minCursorData.row = visiblePoints[0].index;
                                    minCursorData.column = columnName;
                                    maxCursorData.row = visiblePoints[visiblePoints.length - 1].index;
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
                                state: 'chart.zoomOut'
                            }, e);
                            addExtremesEventCallbacks.push(...addExtremesEvent());
                        }
                    };
                    cleanupCallbacks.push(addEvent(chart, 'selection', handleChartResetSelection));
                    cleanupCallbacks.push(() => {
                        cursor.remitCursor(table.id, {
                            type: 'position',
                            state: 'xAxis.extremes.min'
                        });
                        cursor.remitCursor(table.id, {
                            type: 'position',
                            state: 'xAxis.extremes.max'
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
            }
        }
    },
    handlers: {
        seriesVisibilityHandler: function () {
            const component = this;
            const { board } = this;
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
                const table = this.connector && this.connector.table;
                if (!table) {
                    return;
                }
                dataCursor.addListener(table.id, 'series.show', handleShow);
                dataCursor.addListener(table.id, 'series.hide', handleHide);
            };
            const unregisterCursorListeners = () => {
                const table = this.connector && this.connector.table;
                if (table) {
                    board.dataCursor.removeListener(table.id, 'series.show', handleShow);
                    board.dataCursor.removeListener(table.id, 'series.hide', handleHide);
                }
            };
            if (board) {
                registerCursorListeners();
                return unregisterCursorListeners;
            }
        },
        highlightHandler: function () {
            const { chart, board } = this;
            const getHoveredPoint = (e) => {
                const table = this.connector && this.connector.table;
                if (!table) {
                    return;
                }
                let offset = 0;
                const modifier = table.getModifier();
                if (modifier && modifier.options.type === 'Range') {
                    offset = getModifiedTableOffset(table, modifier.options);
                }
                if (chart && chart.series?.length) {
                    const cursor = e.cursor;
                    if (cursor.type === 'position') {
                        let [series] = chart.series;
                        // #20133 - Highcharts dashboards don't sync
                        // tooltips when charts have multiple series
                        if (chart.series.length > 1 && cursor.column) {
                            const relatedSeries = chart.series.filter((series) => (series.name === cursor.column));
                            if (relatedSeries.length > 0) {
                                [series] = relatedSeries;
                            }
                        }
                        if (series?.visible && cursor.row !== void 0) {
                            const point = series.data[cursor.row - offset];
                            if (point?.graphic) {
                                return point;
                            }
                        }
                    }
                }
            };
            const handleCursor = (e) => {
                const highlightOptions = this.sync.syncConfig.highlight;
                if (!highlightOptions.enabled) {
                    return;
                }
                const point = getHoveredPoint(e);
                if (!point || !chart ||
                    // Non-cartesian points do not use 'isInside'
                    (!point.isInside && point.series.isCartesian) ||
                    // Abort if the affected chart is the same as the one
                    // that is currently affected manually.
                    point === chart.hoverPoint) {
                    return;
                }
                const tooltip = chart.tooltip;
                if (tooltip && highlightOptions.showTooltip) {
                    const useSharedTooltip = tooltip.shared;
                    const hoverPoint = chart.hoverPoint;
                    const hoverSeries = hoverPoint?.series ||
                        chart.hoverSeries;
                    const points = chart.pointer?.getHoverData(point, hoverSeries, chart.series, true, true);
                    if (chart.tooltip && points) {
                        tooltip.refresh(useSharedTooltip ? points.hoverPoints : point);
                    }
                }
                if (highlightOptions.highlightPoint && (
                // If the tooltip is shared, the hover state is
                // already set on the point.
                (!tooltip?.shared && highlightOptions.showTooltip) ||
                    !highlightOptions.showTooltip)) {
                    point.setState('hover');
                }
                if (highlightOptions.showCrosshair) {
                    point.series.xAxis?.drawCrosshair(void 0, point);
                    point.series.yAxis?.drawCrosshair(void 0, point);
                }
            };
            const handleCursorOut = (e) => {
                const highlightOptions = this.sync.syncConfig.highlight;
                if (!chart || !chart.series.length ||
                    !highlightOptions.enabled) {
                    return;
                }
                const point = getHoveredPoint(e);
                // Abort if the affected chart is the same as the one
                // that is currently affected manually.
                if (point && (!point.isInside && point.series.isCartesian ||
                    point === chart.hoverPoint)) {
                    return;
                }
                let unhovered = false;
                const unhoverAllPoints = () => {
                    // If the 'row' parameter is missing in the event
                    // object, the unhovered point cannot be identified.
                    const series = chart.series;
                    const seriesLength = series.length;
                    for (let i = 0; i < seriesLength; i++) {
                        const points = chart.series[i].points;
                        const pointsLength = points.length;
                        for (let j = 0; j < pointsLength; j++) {
                            points[j].setState();
                        }
                    }
                };
                const tooltip = chart.tooltip;
                if (tooltip && highlightOptions.showTooltip) {
                    tooltip.hide();
                    // Shared tooltip refresh always hovers points, so it's
                    // important to unhover all points on cursor out.
                    if (tooltip.shared) {
                        unhoverAllPoints();
                        unhovered = true;
                    }
                }
                if (highlightOptions.highlightPoint && !unhovered) {
                    if (point) {
                        point.setState();
                    }
                    else {
                        unhoverAllPoints();
                    }
                }
                if (highlightOptions.showCrosshair) {
                    if (point) {
                        point.series.xAxis?.drawCrosshair();
                        point.series.yAxis?.drawCrosshair();
                    }
                    else {
                        // If the 'row' parameter is missing in the event
                        // object, the unhovered point cannot be identified.
                        const xAxes = chart.xAxis;
                        const yAxes = chart.yAxis;
                        for (let i = 0, l = xAxes.length; i < l; i++) {
                            xAxes[i].drawCrosshair();
                        }
                        for (let i = 0, l = yAxes.length; i < l; i++) {
                            yAxes[i].drawCrosshair();
                        }
                    }
                }
            };
            const registerCursorListeners = () => {
                const { dataCursor: cursor } = board;
                if (cursor) {
                    const table = this.connector && this.connector.table;
                    if (table) {
                        cursor.addListener(table.id, 'point.mouseOver', handleCursor);
                        cursor.addListener(table.id, 'dataGrid.hoverRow', handleCursor);
                        cursor.addListener(table.id, 'point.mouseOut', handleCursorOut);
                        cursor.addListener(table.id, 'dataGrid.hoverOut', handleCursorOut);
                    }
                }
            };
            const unregisterCursorListeners = () => {
                const table = this.connector && this.connector.table;
                if (table) {
                    board.dataCursor.removeListener(table.id, 'point.mouseOver', handleCursor);
                    board.dataCursor.removeListener(table.id, 'dataGrid.hoverRow', handleCursor);
                    board.dataCursor.removeListener(table.id, 'point.mouseOut', handleCursorOut);
                    board.dataCursor.removeListener(table.id, 'dataGrid.hoverOut', handleCursorOut);
                }
            };
            if (board) {
                registerCursorListeners();
                return unregisterCursorListeners;
            }
        },
        extremesHandler: function () {
            const { chart, board } = this;
            if (chart && board && chart.zooming?.type) {
                const dimensions = chart.zooming.type.split('')
                    .map((c) => c + 'Axis');
                const unregisterCallbacks = [];
                dimensions.forEach((dimension) => {
                    const handleUpdateExtremes = (e) => {
                        const { cursor, event } = e;
                        if (cursor.type === 'position') {
                            const eventTarget = event && event.target;
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
                        const { connector } = this;
                        if (connector) {
                            const { table } = connector;
                            cursor.addListener(table.id, `${dimension}.extremes.min`, handleUpdateExtremes);
                            cursor.addListener(table.id, `${dimension}.extremes.max`, handleUpdateExtremes);
                            const handleChartZoomOut = () => {
                                chart.zoomOut();
                                setTimeout(() => {
                                    // Workaround for zoom button not being removed
                                    const resetZoomButtons = this.element
                                        .querySelectorAll('.highcharts-reset-zoom');
                                    resetZoomButtons.forEach((button) => {
                                        button.remove();
                                    });
                                });
                            };
                            cursor.addListener(table.id, 'chart.zoomOut', handleChartZoomOut);
                            unregisterCallbacks.push(() => {
                                cursor.removeListener(table.id, `${dimension}.extremes.min`, handleUpdateExtremes);
                                cursor.removeListener(table.id, `${dimension}.extremes.max`, handleUpdateExtremes);
                                cursor.removeListener(table.id, 'chart.zoomOut', handleChartZoomOut);
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
    }
};
const defaults = {
    extremes: { emitter: configs.emitters.extremesEmitter, handler: configs.handlers.extremesHandler },
    highlight: { emitter: configs.emitters.highlightEmitter, handler: configs.handlers.highlightHandler },
    visibility: { emitter: configs.emitters.seriesVisibilityEmitter, handler: configs.handlers.seriesVisibilityHandler }
};
export default defaults;
