/* *
 *
 *  (c) 2009-2024 Highsoft AS
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
import U from '../../../Utilities.js';
const { error } = U;
/* *
*
*  Utility Functions
*
* */
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
const defaultOptions = {
    affectedSeriesId: null,
    highlightPoint: true,
    showTooltip: true,
    showCrosshair: true
};
const syncPair = {
    emitter: function () {
        if (this.type !== 'Highcharts') {
            return;
        }
        const component = this;
        const { chart, board } = component;
        const highlightOptions = this.sync.syncConfig.highlight;
        const groupKey = highlightOptions.group ?
            ':' + highlightOptions.group : '';
        if (!highlightOptions.enabled || !chart) {
            return;
        }
        const { dataCursor: cursor } = board;
        for (let i = 0, iEnd = chart.series?.length ?? 0; i < iEnd; ++i) {
            const series = chart.series[i];
            const seriesId = series.options.id ?? '';
            const connectorHandler = component.seriesFromConnector[seriesId];
            const table = connectorHandler?.connector?.table;
            let columnName;
            if (!table) {
                continue;
            }
            const colAssignment = connectorHandler.columnAssignment?.find((s) => s.seriesId === seriesId);
            // TODO: Better way to recognize the column name.
            if (colAssignment) {
                const { data } = colAssignment;
                if (typeof data === 'string') {
                    columnName = data;
                }
                else if (Array.isArray(data)) {
                    columnName = data[1];
                }
                else {
                    columnName = data.y ?? data.value;
                }
            }
            if (!columnName) {
                columnName = series.name;
            }
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
                                column: columnName,
                                state: 'point.mouseOver' + groupKey
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
                                column: columnName,
                                state: 'point.mouseOut' + groupKey
                            });
                        }
                    }
                }
            }, false);
        }
        chart.redraw();
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
    handler: function () {
        if (this.type !== 'Highcharts') {
            return;
        }
        const component = this;
        const groupKey = this.sync.syncConfig.highlight.group ?
            ':' + this.sync.syncConfig.highlight.group : '';
        const { chart, board } = component;
        const getHoveredPoint = (e) => {
            const { table, cursor } = e;
            const highlightOptions = this.sync
                .syncConfig.highlight;
            const modifier = table.getModifier();
            let offset = 0;
            if (modifier && modifier.options.type === 'Range') {
                offset = getModifiedTableOffset(table, modifier.options);
            }
            if (chart && chart.series?.length && cursor.type === 'position') {
                let series;
                const seriesId = highlightOptions.affectedSeriesId;
                if (highlightOptions.affectedSeriesId) {
                    const foundSeries = chart.get(highlightOptions.affectedSeriesId);
                    if (foundSeries?.points) {
                        series = foundSeries;
                    }
                    else {
                        error('No series with ID \'' + seriesId + '\' found in ' +
                            'the chart. Affected series will be selected ' +
                            'according to the column assignment.');
                    }
                }
                if (!series) {
                    const seriesIds = Object.keys(component.seriesFromConnector);
                    for (let i = 0, iEnd = seriesIds.length; i < iEnd; ++i) {
                        const seriesId = seriesIds[i];
                        const connectorHandler = component.seriesFromConnector[seriesId];
                        if (connectorHandler?.connector?.table !== table) {
                            continue;
                        }
                        const colAssignment = connectorHandler.columnAssignment;
                        series = chart.get(seriesId);
                        if (!colAssignment) {
                            break;
                        }
                        const { data } = colAssignment.find((s) => s.seriesId === seriesId) ?? {};
                        if (!data || !cursor.column) {
                            break;
                        }
                        if (typeof data === 'string') {
                            if (data === cursor.column) {
                                break;
                            }
                        }
                        else if (Array.isArray(data)) {
                            if (data.includes(cursor.column)) {
                                break;
                            }
                        }
                        else {
                            if (Object.keys(data)
                                .map((key) => data[key])
                                .includes(cursor.column)) {
                                break;
                            }
                        }
                    }
                }
                if (series?.visible && cursor.row !== void 0) {
                    const point = series.data[cursor.row - offset];
                    if (point?.visible) {
                        return point;
                    }
                }
            }
        };
        const handleCursor = (e) => {
            const highlightOptions = this.sync
                .syncConfig.highlight;
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
                if (chart.tooltip && points?.hoverPoints.length) {
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
            const highlightOptions = this.sync
                .syncConfig.highlight;
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
            const { connectorHandlers } = this;
            if (!cursor) {
                return;
            }
            for (let i = 0, iEnd = connectorHandlers.length; i < iEnd; ++i) {
                const table = connectorHandlers[i]?.connector?.table;
                if (!table) {
                    continue;
                }
                cursor.addListener(table.id, 'point.mouseOver' + groupKey, handleCursor);
                cursor.addListener(table.id, 'dataGrid.hoverRow' + groupKey, handleCursor);
                cursor.addListener(table.id, 'point.mouseOut' + groupKey, handleCursorOut);
                cursor.addListener(table.id, 'dataGrid.hoverOut' + groupKey, handleCursorOut);
            }
        };
        const unregisterCursorListeners = () => {
            const { dataCursor: cursor } = board;
            const { connectorHandlers } = this;
            if (!cursor) {
                return;
            }
            for (let i = 0, iEnd = connectorHandlers.length; i < iEnd; ++i) {
                const table = connectorHandlers[i]?.connector?.table;
                if (!table) {
                    continue;
                }
                cursor.removeListener(table.id, 'point.mouseOver' + groupKey, handleCursor);
                cursor.removeListener(table.id, 'dataGrid.hoverRow' + groupKey, handleCursor);
                cursor.removeListener(table.id, 'point.mouseOut' + groupKey, handleCursorOut);
                cursor.removeListener(table.id, 'dataGrid.hoverOut' + groupKey, handleCursorOut);
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
