import moment from 'moment';
export declare enum DateFormat {
    SqlFormat = "YYYY/MM/DD HH:mm:ss",
    ReadableFormat = "DD/MM/YYYY",
    ReadableFormatWithHours = "DD/MM/YYYY HH:mm",
    Timestamp = "",
    Joined = "YYYYMMDD",
    Cron = "ss mm HH DD MM E",
    UTCFormat = "YYYY/MM/DDTHH:mm:ss[Z]"
}
declare type PeriodUnit = `minutes` | `hours` | `days` | `months` | `years`;
declare type Pattern = DateFormat | string;
export declare class Dates {
    static readonly now: (format?: Pattern) => string;
    static readonly date: (str?: string) => moment.Moment;
    static readonly format: (date: any, options: {
        format: Pattern;
        pattern?: Pattern;
    }) => string | number;
    static readonly isInPeriod: (date: any, options: {
        pattern?: Pattern;
        period: number;
        unit: PeriodUnit;
    }) => boolean;
    static readonly hasPassed: (date: any, options: {
        pattern?: Pattern;
    }) => boolean;
    static readonly isBefore: (one: {
        date: any;
        pattern?: Pattern;
    }, other: {
        date: any;
        pattern?: Pattern;
    }) => boolean;
    static readonly getNextWorkDay: () => moment.Moment;
    static readonly add: (date: any, options: {
        value: number;
        unit: PeriodUnit;
        pattern?: Pattern;
        format?: Pattern;
    }) => string | number;
    static readonly substract: (date: any, options: {
        value: number;
        period: PeriodUnit;
        pattern?: Pattern;
        format?: Pattern;
    }) => string | number;
    static readonly startOf: (period: PeriodUnit, params: {
        format?: Pattern;
    }) => string;
}
export {};
