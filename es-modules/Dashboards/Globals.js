/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  Integration of this software requires a license.
 *  - For commercial use, see www.highcharts.com/license
 *  - For non-commercial, see www.highcharts.com/license-eula
 *
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *  - Paweł Lysy
 *  - Karol Kołodziej
 *
 * */
'use strict';
/* *
 *
 *  Constants
 *
 * */
/**
 * Prefix of a GUIElement HTML class name.
 */
export const classNamePrefix = 'highcharts-dashboards-';
export const version = '4.2.2';
/** @internal */
export const classNames = {
    layout: classNamePrefix + 'layout',
    cell: classNamePrefix + 'cell',
    cellHover: classNamePrefix + 'cell-state-hover',
    cellActive: classNamePrefix + 'cell-state-active',
    cellLoading: classNamePrefix + 'cell-state-loading',
    row: classNamePrefix + 'row',
    layoutsWrapper: classNamePrefix + 'layouts-wrapper',
    boardContainer: classNamePrefix + 'wrapper'
};
/** @internal */
export const guiElementType = {
    row: 'row',
    cell: 'cell',
    layout: 'layout'
};
/**
 * Contains all Board instances of this window.
 */
export const boards = [];
/**
 * Reference to the window used by Dashboards.
 */
export const win = window;
export const doc = document;
export const noop = function () { };
export const isMS = /(edge|msie|trident)/i
    .test((win.navigator && win.navigator.userAgent) || '') && !win.opera;
const Globals = {
    boards,
    classNamePrefix,
    classNames,
    doc,
    guiElementType,
    isMS,
    noop,
    version,
    win
};
/* *
 *
 *  Default Export
 *
 * */
export default Globals;
