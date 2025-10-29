/**
 * Deprecated types
 * @private
 */
declare global {
    interface HTMLCanvasElement {
        /** @deprecated */
        msToBlob: Function;
    }
    /** @deprecated */
    interface MSBlobBuilder extends Blob {
        /** @deprecated */
        append: Function;
        /** @deprecated */
        getBlob: Function;
    }
    interface Navigator {
        /** @deprecated */
        msSaveOrOpenBlob: Function;
    }
    interface Window {
        /** @deprecated */
        MSBlobBuilder?: Class<MSBlobBuilder>;
    }
}
/**
 * Convert base64 dataURL to Blob if supported, otherwise returns undefined.
 *
 * @private
 * @function Highcharts.dataURLtoBlob
 *
 * @param {string} dataURL
 * URL to convert.
 *
 * @return {string | undefined}
 * Blob.
 */
declare function dataURLtoBlob(dataURL: string): (string | undefined);
/**
 * Download a data URL in the browser. Can also take a blob as first param.
 *
 * @private
 * @function Highcharts.downloadURL
 *
 * @param {string | global.URL} dataURL
 * The dataURL/Blob to download.
 * @param {string} filename
 * The name of the resulting file (w/extension).
 */
declare function downloadURL(dataURL: (string | URL), filename: string): void;
/**
 * Asynchronously downloads a script from a provided location.
 *
 * @private
 * @function Highcharts.getScript
 *
 * @param {string} scriptLocation
 * The location for the script to fetch.
 */
declare function getScript(scriptLocation: string): Promise<void>;
/**
 * Get a blob object from content, if blob is supported.
 *
 * @private
 * @function Highcharts.getBlobFromContent
 *
 * @param {string} content
 * The content to create the blob from.
 * @param {string} type
 * The type of the content.
 *
 * @return {string | undefined}
 * The blob object, or undefined if not supported.
 *
 * @requires modules/exporting
 * @requires modules/export-data
 */
declare function getBlobFromContent(content: string, type: string): (string | undefined);
declare const DownloadURL: {
    dataURLtoBlob: typeof dataURLtoBlob;
    downloadURL: typeof downloadURL;
    getBlobFromContent: typeof getBlobFromContent;
    getScript: typeof getScript;
};
export default DownloadURL;
