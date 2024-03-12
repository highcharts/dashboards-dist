import type Component from '../Component';
import type AST from '../../../Core/Renderer/HTML/AST';
export interface Options extends Component.Options {
    /**
     * Array of HTML elements, declared as string or node.
     * ```
     * Example:
     *
     * elements: [{
     *   tagName: 'img',
     *   attributes: {
     *       src: 'http://path.to.image'
     *   }
     * }]
     * ```
     *
     * Try it:
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/html-component/single-element/ | HTML component with one image.}
     *
     * {@link https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/dashboards/html-component/nested-elements/ | HTML component with nested images.}
     *
     */
    elements?: (AST.Node | string)[];
    /**
     * The HTML content of the component. If the `elements` option is set, the
     * `html` option will be ignored.
     *
     * @example
     * ```JavaScript
     * html: `
     *      <div>
     *          <h1>Custom HTML</h1>
     *          <span id="custom-html-div">Custom HTML added as string </span>
     *      </div>
     * `
     * ```
     */
    html?: string;
    type: 'HTML';
}
export default Options;
