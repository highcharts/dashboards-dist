import type SolidGaugePoint from '../../Series/SolidGauge/SolidGaugePoint';
import type ColorAxis from './Color/ColorAxis';
import type ColorType from '../../Core/Color/ColorType';
import type RadialAxis from './RadialAxis';
/**
 * @private
 */
interface SolidGaugeAxis extends RadialAxis.AxisComposition {
    dataClasses: ColorAxis['dataClasses'];
    options: SolidGaugeAxis.Options;
    stops: ColorAxis['stops'];
    initDataClasses(userOptions: ColorAxis.Options): void;
    initStops(userOptions: ColorAxis.Options): void;
    toColor(value: number, point: SolidGaugePoint): (ColorType | undefined);
}
/**
 * @private
 */
declare namespace SolidGaugeAxis {
    interface Options extends ColorAxis.Options {
        dataClassColor?: ColorAxis.Options['dataClassColor'];
        dataClasses?: ColorAxis.Options['dataClasses'];
        maxColor?: ColorAxis.Options['maxColor'];
        minColor?: ColorAxis.Options['minColor'];
        stops?: ColorAxis.Options['stops'];
    }
    /**
     * @private
     */
    function init(axis: RadialAxis.AxisComposition): void;
}
export default SolidGaugeAxis;
