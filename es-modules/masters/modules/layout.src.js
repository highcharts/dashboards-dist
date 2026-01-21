// SPDX-License-Identifier: LicenseRef-Highcharts
/**
 * @license Highcharts Dashboards Layout 4.1.0 (2026-01-21)
 * @module dashboards/modules/layout
 * @requires dashboards
 *
 * (c) 2009-2026 Highsoft AS
 *
 * A commercial license may be required depending on use.
 * See www.highcharts.com/license
 */
'use strict';
/* *
 *
 *  Imports
 *
 * */
import Globals from '../../Dashboards/Globals.js';
// Fill registries
import '../../Dashboards/EditMode/EditMode.js';
import '../../Dashboards/EditMode/Fullscreen.js';
import EditMode from '../../Dashboards/EditMode/EditMode.js';
import Fullscreen from '../../Dashboards/EditMode/Fullscreen.js';
/* *
 *
 *  Namespace
 *
 * */
const G = Globals;
G.EditMode = EditMode;
G.Fullscreen = Fullscreen;
/* *
 *
 *  Default Export
 *
 * */
export default G;
