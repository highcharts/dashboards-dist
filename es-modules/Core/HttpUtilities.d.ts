import type JSON from './JSON';
export interface AjaxErrorCallbackFunction {
    (request: XMLHttpRequest, error: (string | Error)): void;
}
export interface AjaxSettingsObject {
    data?: (string | JSON.Type | JSON.Builder | JSON);
    dataType?: ('json' | 'text' | 'xml' | 'octet' | string);
    error?: AjaxErrorCallbackFunction;
    headers?: Record<string, string>;
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
    success?: AjaxSuccessCallbackFunction;
    type?: ('get' | 'post' | 'update' | 'delete');
    url: string;
}
export interface AjaxSuccessCallbackFunction {
    (response: (string | JSON.Type), xhr: XMLHttpRequest): void;
}
/**
 * Perform an Ajax call.
 *
 * @function Highcharts.ajax
 *
 * @param {Highcharts.AjaxSettingsObject} settings
 *        The Ajax settings to use.
 *
 * @return {false|undefined}
 *         Returns false, if error occurred.
 */
declare function ajax(settings: AjaxSettingsObject): (false | undefined);
/**
 * Get a JSON resource over XHR, also supporting CORS without preflight.
 *
 * @function Highcharts.getJSON
 * @param {string} url
 *        The URL to load.
 * @param {Function} success
 *        The success callback. For error handling, use the `Highcharts.ajax`
 *        function instead.
 */
declare function getJSON(url: string, success: AjaxSuccessCallbackFunction): void;
/**
 * The post utility
 *
 * @private
 * @function Highcharts.post
 *
 * @param {string} url
 * Post URL
 *
 * @param {Object} data
 * Post data
 *
 * @param {RequestInit} [fetchOptions]
 * Additional attributes for the post request
 */
/**
 *
 */
declare function post(url: string, data: Record<string, any>, fetchOptions?: RequestInit): Promise<void>;
declare const HttpUtilities: {
    ajax: typeof ajax;
    getJSON: typeof getJSON;
    post: typeof post;
};
export default HttpUtilities;
