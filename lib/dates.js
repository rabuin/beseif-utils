"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dates = exports.DateFormatHyphen = exports.DateFormat = void 0;
const moment_1 = __importDefault(require("moment"));
var DateFormat;
(function (DateFormat) {
    DateFormat["SqlFormat"] = "YYYY/MM/DD HH:mm:ss";
    DateFormat["ReadableFormat"] = "DD/MM/YYYY";
    DateFormat["ReadableFormatWithHours"] = "DD/MM/YYYY HH:mm";
    DateFormat["Timestamp"] = "";
    DateFormat["Joined"] = "YYYYMMDD";
    DateFormat["Cron"] = "ss mm HH DD MM E";
    DateFormat["UTCFormat"] = "YYYY/MM/DDTHH:mm:ss[Z]";
})(DateFormat = exports.DateFormat || (exports.DateFormat = {}));
var DateFormatHyphen;
(function (DateFormatHyphen) {
    DateFormatHyphen["SqlFormat"] = "YYYY-MM-DD HH:mm:ss";
    DateFormatHyphen["ReadableFormat"] = "DD-MM-YYYY";
    DateFormatHyphen["ReadableFormatWithHours"] = "DD-MM-YYYY HH:mm";
    DateFormatHyphen["UTCFormat"] = "YYYY-MM-DDTHH:mm:ss[Z]";
})(DateFormatHyphen = exports.DateFormatHyphen || (exports.DateFormatHyphen = {}));
const WORK_DAYS_MIN = 1;
const WORK_DAYS_MAX = 5;
class Dates {
}
exports.Dates = Dates;
Dates.now = (format) => (0, moment_1.default)().format(format);
Dates.date = (str) => (0, moment_1.default)(str);
Dates.format = (date, options) => {
    if (!date) {
        return undefined;
    }
    const d = (0, moment_1.default)(date, options.pattern);
    return options.format === DateFormat.Timestamp ? d.valueOf() : d.format(options.format);
};
Dates.isInPeriod = (date, options) => (0, moment_1.default)(date, options.pattern).add(options.period, options.unit).isAfter((0, moment_1.default)());
Dates.hasPassed = (date, options) => (0, moment_1.default)(date, options.pattern).isBefore((0, moment_1.default)());
Dates.isBefore = (one, other) => (0, moment_1.default)(one.date, one.pattern).isBefore((0, moment_1.default)(other.date, other.pattern));
Dates.getNextWorkDay = () => {
    let d = (0, moment_1.default)();
    while (!(d.day() > WORK_DAYS_MIN && d.day() < WORK_DAYS_MAX)) {
        d = d.add(1, `day`);
    }
    return d;
};
Dates.add = (date, options) => Dates.format((0, moment_1.default)(date, options.pattern).add(options.value, options.unit), { format: options.format });
Dates.substract = (date, options) => Dates.format((0, moment_1.default)(date, options.pattern).subtract(options.value, options.period), { format: options.format });
Dates.startOf = (period, params) => (0, moment_1.default)().startOf(period).format(params.format);
