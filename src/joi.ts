
// tslint:disable-next-line: no-var-requires quotemark
const joi = require('joi').extend(require('@joi/date'));

type stringParams = { min?: number, max?: number, length?: number, valid?: string[] };
type dateParams = { format?: string };
type emailParams = { min?: number, max?: number };
type numberParams = { min?: number, max?: number };
type arrayParams = { min?: number, max?: number, items?: any };
type alternativeParams = { property?: string, valid?: string[] };

export class Joi {

    /* SCHEMAS */

    public static readonly alternatives = (params: alternativeParams = {}) => {
        let schema = joi.string();

        schema = schema.when(
            params.property,
            {
                is: params.valid,
                then: Joi.string().required(),
                otherwise: Joi.string({ valid: [null] }),
            });
        return schema;
    }
    public static readonly string = (params: stringParams = {}) => {
        let schema = joi.string();
        if (params.min) { schema = schema.min(params.min); }
        if (params.max) { schema = schema.max(params.max); }
        if (params.valid) { schema = schema.valid(...params.valid); }
        return schema;
    }
    public static readonly requiredString = (params: stringParams = {}) => Joi.string(params).required();

    public static readonly date = (params: dateParams = {}) => {
        let schema = joi.date();
        if (params.format) { schema = schema.format(params.format); }
        return schema;
    }
    public static readonly requiredDate = (params: dateParams = {}) => Joi.date(params).required();

    public static readonly email = (params: emailParams = {}) => Joi.string(params).email();
    public static readonly requiredEmail = (params: emailParams = {}) => Joi.email(params).required();

    public static readonly number = (params: numberParams = {}) => {
        let schema = joi.number();
        if (params.min) { schema = schema.min(params.min); }
        if (params.max) { schema = schema.max(params.max); }
        return schema;
    }
    public static readonly requiredNumber = (params: numberParams = {}) => Joi.number(params).required();

    public static readonly schemaArray = (itemSchema: any) => {
        let schema = joi.array();
        schema = schema.items(itemSchema);
        return schema;
    }
    public static readonly array = (params: arrayParams = {}) => {
        let schema = joi.array();
        if (params.min) { schema = schema.min(params.min); }
        if (params.max) { schema = schema.max(params.max); }
        if (params.items) { schema = schema.items(Joi.string().valid()); }
        return schema;
    }
    // TODO check array of string valid -- tool.ts
    public static readonly requiredArray = (params: arrayParams = {}) => Joi.array(params).required();

    public static readonly bool = () => joi.boolean();
    public static readonly requiredBool = () => Joi.bool().required();

    public static readonly object = (schema?: object) => joi.object(schema);
    public static readonly requiredObject = (schema?: object) => Joi.object(schema).required();

    public static readonly reference = (params: string) => joi.ref(params);

    /* VALIDATION */
    public static readonly allowUnknown = { allowUnknown: true };

    public static readonly validateSchema = async (schema: any, params: any, options?: any): Promise<any> =>
        new Promise(async (resolve, reject) => {
            try {
                await schema.validateAsync(params, options);
                resolve(params);
            } catch (err) {
                console.error(`Validation error`, params);
                reject(err.details[0].message);
            }
        })
}