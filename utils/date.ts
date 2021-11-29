import moment from 'moment';

export enum DateFormat {
    SqlFormat = `YYYY/MM/DD HH:mm:ss`,
    ReadableFormat = `DD/MM/YYYY`,
    ReadableFormatWithHours = `DD/MM/YYYY HH:mm`,
    Timestamp = ``,
    Joined = `YYYYMMDD`,
    Cron = `ss mm HH DD MM E`,
}

type PeriodUnit = `minutes` | `hours` | `days` | `months` | `years`;
type Pattern = DateFormat | string;

const WORK_DAYS_MIN = 1;
const WORK_DAYS_MAX = 5;

export class Dates {

    public static readonly now = (format?: Pattern) =>
        moment().format(format)

    public static readonly date = (str?: string) =>
        moment(str)

    public static readonly format = (date: any, options: { format: Pattern, pattern?: Pattern }) => {
        if (!date) { return undefined; }
        const d = moment(date, options.pattern);
        return options.format === DateFormat.Timestamp ? d.valueOf() : d.format(options.format);
    }

    public static readonly isInPeriod = (date: any, options: { pattern?: Pattern, period: number, unit: PeriodUnit }) =>
        moment(date, options.pattern).add(options.period, options.unit).isAfter(moment())

    public static readonly hasPassed = (date: any, options: { pattern?: Pattern }) =>
        moment(date, options.pattern).isBefore(moment())

    public static readonly isBefore = (one: { date: any, pattern?: Pattern }, other: { date: any, pattern?: Pattern }) =>
        moment(one.date, one.pattern).isBefore(moment(other.date, other.pattern))

    public static readonly getNextWorkDay = () => {
        let d = moment();
        while (!(d.day() > WORK_DAYS_MIN && d.day() < WORK_DAYS_MAX)) {
            d = d.add(1, `day`);
        }
        return d;
    }

    public static readonly add = (date: any, options: { value: number, unit: PeriodUnit, pattern?: Pattern, format?: Pattern }) =>
        Dates.format(moment(date, options.pattern).add(options.value, options.unit), { format: options.format })

    public static readonly substract = (date: any, options: { value: number, period: PeriodUnit, pattern?: Pattern, format?: Pattern }) =>
        Dates.format(moment(date, options.pattern).subtract(options.value, options.period), { format: options.format })

    public static readonly startOf = (period: PeriodUnit, params: { format?: Pattern }) =>
        moment().startOf(period).format(params.format)
}