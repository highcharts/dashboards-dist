import type TickPositionsArray from './Axis/TickPositionsArray';
import type TimeTicksInfoObject from './Axis/TimeTicksInfoObject';
import TimeBase from '../Shared/TimeBase.js';
declare module './Axis/TickPositionsArray' {
    interface TickPositionsArray {
        info?: TimeTicksInfoObject;
    }
}
declare class Time extends TimeBase {
    /**
     * Return an array with time positions distributed on round time values
     * right and right after min and max. Used in datetime axes as well as for
     * grouping data on a datetime axis.
     *
     * @function Highcharts.Time#getTimeTicks
     *
     * @param {Highcharts.TimeNormalizedObject} normalizedInterval
     *        The interval in axis values (ms) and the count
     *
     * @param {number} [min]
     *        The minimum in axis values
     *
     * @param {number} [max]
     *        The maximum in axis values
     *
     * @param {number} [startOfWeek=1]
     *
     * @return {Highcharts.AxisTickPositionsArray}
     * Time positions
     */
    getTimeTicks(normalizedInterval: Time.TimeNormalizedObject, min?: number, max?: number, startOfWeek?: number): TickPositionsArray;
}
declare namespace Time {
    interface DateTimeFormatOptions extends Intl.DateTimeFormatOptions {
        dateStyle?: 'full' | 'long' | 'medium' | 'short';
        fractionalSecondDigits?: number;
        prefix?: string;
        suffix?: string;
        timeStyle?: 'full' | 'long' | 'medium' | 'short';
    }
    type DateTimeFormat = string | DateTimeFormatOptions;
    interface DateTimeLabelFormatObject {
        from?: DateTimeFormat;
        list?: DateTimeFormat[];
        main: DateTimeFormat;
        range?: boolean;
        to?: DateTimeFormat;
    }
    type DateTimeLabelFormatOption = (DateTimeFormat | Array<string> | Time.DateTimeLabelFormatObject);
    type DateTimeLabelFormatsOption = (Record<TimeUnit, DateTimeLabelFormatOption>);
    interface TimeOptions {
        Date?: any;
        locale?: string | Array<string>;
        timezone?: string;
        timezoneOffset?: number;
        useUTC?: boolean;
    }
    interface TimeFormatCallbackFunction {
        (this: Time, timestamp: number): string;
    }
    interface TimeNormalizedObject {
        count: number;
        unitName: TimeUnit;
        unitRange: number;
    }
    type TimeUnit = ('millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year');
    type TimeUnitValue = ('Date' | 'Day' | 'FullYear' | 'Hours' | 'Milliseconds' | 'Minutes' | 'Month' | 'Seconds');
}
export default Time;
