/* *
 *
 *  Sparkline Cell Content class
 *
 *  (c) 2020-2025 Highsoft AS
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
import CellContentPro from '../CellContentPro.js';
import Globals from '../../../Core/Globals.js';
import U from '../../../../Core/Utilities.js';
const { defined, merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Represents a sparkline type of cell content.
 */
class SparklineContent extends CellContentPro {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(cell, renderer, parentElement) {
        super(cell, renderer);
        this.onKeyDown = () => {
            this.cell.htmlElement.focus();
        };
        this.add(parentElement);
    }
    /* *
     *
     *  Methods
     *
     * */
    add(parentElement = this.cell.htmlElement) {
        const H = SparklineContent.H;
        if (!H || !defined(this.cell.value)) {
            return;
        }
        this.chartContainer = document.createElement('div');
        parentElement.classList.add(Globals.getClassName('noPadding'));
        parentElement.appendChild(this.chartContainer);
        this.chart = H.Chart.chart(this.chartContainer, merge(SparklineContent.defaultChartOptions, this.getProcessedOptions()));
        this.chartContainer.addEventListener('click', this.onKeyDown);
    }
    update() {
        const chartOptions = this.getProcessedOptions();
        this.chart?.update(chartOptions, true, false, chartOptions.chart?.animation);
    }
    destroy() {
        this.chartContainer?.removeEventListener('keydown', this.onKeyDown);
        this.chart?.destroy();
        this.chartContainer?.remove();
        delete this.chart;
        delete this.chartContainer;
        this.cell.htmlElement.classList.remove(Globals.getClassName('noPadding'));
    }
    getProcessedOptions() {
        const renderer = this.renderer;
        const { chartOptions } = renderer.options;
        let options;
        if (typeof chartOptions === 'function') {
            options = chartOptions.call(this.cell, this.cell.value);
        }
        else {
            options = merge(chartOptions) || {};
        }
        let trimmedValue = ('' + this.cell.value).trim();
        if (!trimmedValue.startsWith('[') && !trimmedValue.startsWith('{')) {
            trimmedValue = `[${trimmedValue}]`;
        }
        if (!options.series) {
            options.series = [{
                    data: JSON.parse(trimmedValue)
                }];
        }
        return options;
    }
}
SparklineContent.defaultChartOptions = {
    chart: {
        height: 40,
        margin: [5, 8, 5, 8],
        backgroundColor: 'transparent',
        skipClone: true
    },
    accessibility: {
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    title: {
        text: ''
    },
    credits: {
        enabled: false
    },
    xAxis: {
        visible: false
    },
    yAxis: {
        visible: false
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            marker: {
                enabled: false
            },
            states: {
                hover: {
                    enabled: false
                },
                inactive: {
                    enabled: false
                }
            },
            animation: false,
            dataLabels: {
                enabled: false
            }
        },
        pie: {
            slicedOffset: 0,
            borderRadius: 0
        }
    }
};
/* *
 *
 *  Namespace
 *
 * */
(function (SparklineContent) {
})(SparklineContent || (SparklineContent = {}));
/* *
 *
 *  Default Export
 *
 * */
export default SparklineContent;
