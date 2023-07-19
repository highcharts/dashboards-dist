/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AST from '../../Core/Renderer/HTML/AST.js';
import Component from './Component.js';
import Templating from '../../Core/Templating.js';
const { format } = Templating;
import U from '../../Core/Utilities.js';
const { createElement, css, defined, getStyle, isArray, isNumber, merge, diffObjects } = U;
/* *
 *
 *  Class
 *
 * */
/**
 *
 * Class that represents a KPI component.
 *
 */
class KPIComponent extends Component {
    /* *
     *
     *  Static functions
     *
     * */
    /**
     * Creates component from JSON.
     *
     * @param json
     * Set of component options, used for creating the KPI component.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @returns
     * KPI component based on config from JSON.
     *
     * @internal
     */
    static fromJSON(json, cell) {
        const options = json.options;
        const chartOptions = options.chartOptions && JSON.parse(options.chartOptions);
        const subtitle = JSON.parse(options.subtitle || '{}');
        const title = options.title && JSON.parse(options.title);
        return new KPIComponent(cell, merge(options, {
            chartOptions,
            title,
            subtitle
        }));
    }
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Creates a KPI component in the cell.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell, options) {
        options = merge(KPIComponent.defaultOptions, options);
        super(cell, options);
        this.options = options;
        this.type = 'KPI';
        this.sync = new Component.Sync(this, this.syncHandlers);
        this.value = createElement('span', {
            className: `${Component.defaultOptions.className}-kpi-value`
        }, {}, this.contentElement);
        this.subtitle = createElement('span', {
            className: this.getSubtitleClassName()
        }, {}, this.contentElement);
        if (this.options.chartOptions) {
            this.chartContainer = createElement('div', {
                className: `${Component.defaultOptions.className}-kpi-chart-container`
            }, {}, this.contentElement);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    /** @internal */
    load() {
        super.load();
        this.contentElement.style.display = 'flex';
        this.contentElement.style.flexDirection = 'column';
        this.parentElement.appendChild(this.element);
        this.updateElements();
        return this;
    }
    resize(width, height) {
        super.resize(width, height);
        if (!this.updatingSize &&
            this.dimensions.width &&
            this.dimensions.height) {
            this.updateSize(this.dimensions.width, this.dimensions.height);
        }
        if (this.chart) {
            this.chart.reflow();
        }
        this.updatingSize = false;
        return this;
    }
    /**
     * Calculates and applies font size for the title.
     *
     * @param width
     * The width to calculate the title's font size.
     * @param height
     * The height to calculate the title's font size.
     *
     * @internal
     */
    updateTitleSize(width, height) {
        if (this.titleElement) {
            this.titleElement.style.fontSize = this.getFontSize(width, height, 0.08 * (this.chart ? 1 : 1.7));
        }
    }
    getFontSize(width, height, multiplier) {
        return (Math.max(this.options.minFontSize, Math.round(multiplier * Math.min(width, height))) + 'px');
    }
    /**
     * Updates title / subtitle font size and component dimensions.
     *
     * @param width
     * The width to set the component to.
     * @param height
     * The height to set the component to.
     *
     * @internal
     */
    updateSize(width, height) {
        this.updateTitleSize(width, height);
        // If there is no chart, make the font size  bigger.
        const noChartMultiplier = (this.chart ? 1 : 1.7);
        const noTitleMultiplier = (this.options.title ? 0.7 : 1);
        this.value.style.fontSize = this.getFontSize(width, height, 0.15 * noChartMultiplier * noTitleMultiplier);
        this.subtitle.style.fontSize = this.getFontSize(width, height, 0.08 * noChartMultiplier);
        this.updatingSize = true;
        super.resize(Number(getStyle(this.parentElement, 'width')), Number(getStyle(this.parentElement, 'height')));
    }
    render() {
        super.render();
        const charter = KPIComponent.charter;
        if (charter &&
            this.options.chartOptions &&
            !this.chart &&
            this.chartContainer) {
            this.chart = charter.chart(this.chartContainer, merge(KPIComponent.defaultChartOptions, this.options.chartOptions));
        }
        else if (this.chart &&
            !this.options.chartOptions &&
            'chartOptions' in this.options) {
            this.chart.destroy();
            this.chart = void 0;
        }
        return this;
    }
    redraw() {
        super.redraw();
        this.updateElements();
        return this;
    }
    /**
     * Handles updating via options.
     * @param options
     * The options to apply.
     */
    update(options) {
        const _super = Object.create(null, {
            update: { get: () => super.update }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.update.call(this, options);
            if (options.chartOptions && this.chart) {
                this.chart.update(options.chartOptions);
            }
            this.redraw();
        });
    }
    /**
     * Handles updating elements via options
     *
     * @internal
     */
    updateElements() {
        const { style, subtitle, valueFormat, valueFormatter } = this.options;
        if (this.options.title) {
            this.setTitle(this.options.title);
            if (this.dimensions.width && this.dimensions.height) {
                this.updateTitleSize(this.dimensions.width, this.dimensions.height);
            }
        }
        let value = this.options.value;
        if (defined(value)) {
            let prevValue;
            if (isNumber(value)) {
                prevValue = value;
            }
            if (valueFormatter) {
                value = valueFormatter.call(this, value);
            }
            else if (valueFormat) {
                value = format(valueFormat, { value });
            }
            else if (isNumber(value)) {
                value = value.toLocaleString();
            }
            AST.setElementHTML(this.value, value);
            AST.setElementHTML(this.subtitle, this.getSubtitle());
            this.prevValue = prevValue;
        }
        if (style) {
            css(this.element, style);
        }
        if (typeof subtitle === 'object') {
            if (subtitle.style) {
                css(this.subtitle, subtitle.style);
            }
            this.subtitle.className = this.getSubtitleClassName();
        }
        if (this.chartContainer) {
            this.chartContainer.style.flex =
                this.options.chartOptions ? '1' : '0';
        }
        if (this.chart) {
            this.chart.reflow();
        }
        this.value.style.color = this.getValueColor();
    }
    /**
     * Gets KPI subtitle text.
     *
     * @returns
     * The subtitle's text.
     *
     * @internal
     */
    getSubtitle() {
        const { subtitle, value } = this.options;
        if (typeof subtitle === 'string') {
            return subtitle;
        }
        if (subtitle) {
            if (isNumber(this.prevValue) && isNumber(value)) {
                const diff = value - this.prevValue;
                let prefix = '';
                if (diff > 0) {
                    prefix = '<span style="color:green">&#9650;</span> +';
                }
                else if (diff < 0) {
                    prefix = '<span style="color:red">&#9660;</span> ';
                }
                else {
                    return this.subtitle.innerHTML;
                }
                if (subtitle.type === 'diff') {
                    return prefix + diff.toLocaleString();
                }
                if (subtitle.type === 'diffpercent') {
                    return prefix + format('{v:,.2f}%', {
                        v: diff / this.prevValue * 100
                    });
                }
            }
            return subtitle.text || '';
        }
        return '';
    }
    /**
     * Gets CSS class name of the KPI subtitle.
     *
     * @returns
     * The name of class.
     *
     * @internal
     */
    getSubtitleClassName() {
        const { subtitle } = this.options;
        return `${Component.defaultOptions.className}-kpi-subtitle` +
            ((typeof subtitle === 'object' && subtitle.className) || '');
    }
    /**
     * Applies title's color according to the threshold.
     *
     * @returns
     * Hex of color.
     *
     * @internal
     */
    getValueColor() {
        const { threshold, thresholdColors, value } = this.options;
        if (thresholdColors && threshold && isNumber(value)) {
            if (isArray(threshold)) {
                for (let i = threshold.length - 1; i >= 0; i--) {
                    if (value >= threshold[i]) {
                        if (i + 1 < thresholdColors.length) {
                            return thresholdColors[i + 1];
                        }
                        return thresholdColors[thresholdColors.length - 1];
                    }
                }
            }
            else if (value >= threshold) {
                return thresholdColors[1];
            }
            return thresholdColors[0];
        }
        return '';
    }
    /**
     * Converts the class instance to a class JSON.
     *
     * @returns
     * Class JSON of this Component instance.
     *
     * @internal
     */
    toJSON() {
        const base = super.toJSON();
        const json = Object.assign(Object.assign({}, base), { type: 'KPI', options: Object.assign(Object.assign({}, base.options), { type: 'KPI', value: this.options.value, subtitle: JSON.stringify(this.options.subtitle), title: JSON.stringify(this.options.title), threshold: this.options.threshold, thresholdColors: this.options.thresholdColors, chartOptions: JSON.stringify(this.options.chartOptions), valueFormat: this.options.valueFormat }) });
        this.emit({ type: 'toJSON', json: base });
        return json;
    }
    /**
     * Get the KPI component's options.
     * @returns
     * The JSON of KPI component's options.
     *
     * @internal
     *
     */
    getOptions() {
        return Object.assign(Object.assign({}, diffObjects(this.options, KPIComponent.defaultOptions)), { type: 'KPI' });
    }
}
/**
 * Default options of the KPI component.
 */
KPIComponent.defaultOptions = merge(Component.defaultOptions, {
    type: 'KPI',
    className: [
        Component.defaultOptions.className,
        `${Component.defaultOptions.className}-kpi`
    ].join(' '),
    minFontSize: 20,
    thresholdColors: ['#f45b5b', '#90ed7d']
});
/* *
 *
 *  Static functions
 *
 * */
/**
 * Default options of the KPI component.
 */
KPIComponent.defaultChartOptions = {
    chart: {
        type: 'spline',
        backgroundColor: 'transparent'
    },
    title: {
        text: void 0
    },
    xAxis: {
        visible: false
    },
    yAxis: {
        visible: false,
        title: {
            text: null
        }
    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    tooltip: {
        outside: true
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    }
};
/* *
 *
 *  Default Export
 *
 * */
export default KPIComponent;
