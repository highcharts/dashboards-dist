/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  A commercial license may be required depending on use.
 *  See www.highcharts.com/license
 *
 *
 *  Authors:
 *  - Karol Kolodziej
 *
 * */
'use strict';
import Component from '../Component.js';
/* *
 *
 *  Constants
 *
 * */
const HTMLComponentDefaults = {
    type: 'HTML',
    className: [
        Component.defaultOptions.className,
        `${Component.defaultOptions.className}-html`
    ].join(' '),
    elements: [],
    editableOptions: [
        ...Component.defaultOptions.editableOptions || [],
        {
            name: 'htmlInput',
            propertyPath: ['html'],
            type: 'textarea'
        }
    ]
};
/* *
 *
 *  Default Export
 *
 * */
export default HTMLComponentDefaults;
