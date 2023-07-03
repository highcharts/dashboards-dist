import type Axis from './Axis';
import type AxisOptions from './AxisOptions';
import type Time from '../Time';
declare module './AxisComposition' {
    interface AxisComposition {
        dateTime?: DateTimeAxis.Composition['dateTime'];
    }
}
declare module './AxisOptions' {
    interface AxisOptions {
        dateTimeLabelFormats?: Time.DateTimeLabelFormatsOption;
        units?: Array<[Time.TimeUnit, (Array<number> | null)]>;
    }
}
declare module './AxisType' {
    interface AxisTypeRegistry {
        DateTimeAxis: DateTimeAxis.Composition;
    }
}
declare module '../Series/SeriesOptions' {
    interface SeriesOptions {
        pointInterval?: number;
        pointIntervalUnit?: DateTimeAxis.PointIntervalUnitValue;
    }
}
declare module './TimeTicksInfoObject' {
    interface TimeTicksInfoObject extends Time.TimeNormalizedObject {
    }
}
declare namespace DateTimeAxis {
    class Composition extends Axis {
        dateTime: Additions;
    }
    type PointIntervalUnitValue = ('day' | 'month' | 'year');
    /**
     * Extends axis class with date and time support.
     * @private
     */
    function compose<T extends typeof Axis>(AxisClass: T): (typeof Composition & T);
    class Additions {
        constructor(axis: DateTimeAxis.Composition);
        axis: Axis;
        /**
         * Get a normalized tick interval for dates. Returns a configuration
         * object with unit range (interval), count and name. Used to prepare
         * data for `getTimeTicks`. Previously this logic was part of
         * getTimeTicks, but as `getTimeTicks` now runs of segments in stock
         * charts, the normalizing logic was extracted in order to prevent it
         * for running over again for each segment having the same interval.
         * #662, #697.
         * @private
         */
        normalizeTimeTickInterval(tickInterval: number, unitsOption?: AxisOptions['units']): Time.TimeNormalizedObject;
        /**
         * Get the best date format for a specific X value based on the closest
         * point range on the axis.
         *
         * @private
         */
        getXDateFormat(x: number, dateTimeLabelFormats: Time.DateTimeLabelFormatsOption): string;
    }
}
export default DateTimeAxis;
