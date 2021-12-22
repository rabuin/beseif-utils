"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joi = void 0;
const joi = require('joi').extend(require('@joi/date'));
class Joi {
}
exports.Joi = Joi;
_a = Joi;
Joi.alternatives = (params = {}) => {
    let schema = joi.string();
    schema = schema.when(params.property, {
        is: params.valid,
        then: Joi.string().required(),
        otherwise: Joi.string({ valid: [null] }),
    });
    return schema;
};
Joi.string = (params = {}) => {
    let schema = joi.string();
    if (params.min) {
        schema = schema.min(params.min);
    }
    if (params.max) {
        schema = schema.max(params.max);
    }
    if (params.valid) {
        schema = schema.valid(...params.valid);
    }
    return schema;
};
Joi.requiredString = (params = {}) => Joi.string(params).required();
Joi.date = (params = {}) => {
    let schema = joi.date();
    if (params.format) {
        schema = schema.format(params.format);
    }
    return schema;
};
Joi.requiredDate = (params = {}) => Joi.date(params).required();
Joi.email = (params = {}) => Joi.string(params).email();
Joi.requiredEmail = (params = {}) => Joi.email(params).required();
Joi.number = (params = {}) => {
    let schema = joi.number();
    if (params.min) {
        schema = schema.min(params.min);
    }
    if (params.max) {
        schema = schema.max(params.max);
    }
    return schema;
};
Joi.requiredNumber = (params = {}) => Joi.number(params).required();
Joi.schemaArray = (itemSchema) => {
    let schema = joi.array();
    schema = schema.items(itemSchema);
    return schema;
};
Joi.array = (params = {}) => {
    let schema = joi.array();
    if (params.min) {
        schema = schema.min(params.min);
    }
    if (params.max) {
        schema = schema.max(params.max);
    }
    if (params.items) {
        schema = schema.items(Joi.string().valid());
    }
    return schema;
};
Joi.requiredArray = (params = {}) => Joi.array(params).required();
Joi.bool = () => joi.boolean();
Joi.requiredBool = () => Joi.bool().required();
Joi.object = (schema) => joi.object(schema);
Joi.requiredObject = (schema) => Joi.object(schema).required();
Joi.allowUnknown = { allowUnknown: true };
Joi.validateSchema = async (schema, params, options) => new Promise(async (resolve, reject) => {
    try {
        await schema.validateAsync(params, options);
        resolve(params);
    }
    catch (err) {
        console.error(`Validation error`, params);
        reject(err.details[0].message);
    }
});
