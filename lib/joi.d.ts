declare type stringParams = {
    min?: number;
    max?: number;
    length?: number;
    valid?: string[];
};
declare type dateParams = {
    format?: string;
};
declare type emailParams = {
    min?: number;
    max?: number;
};
declare type numberParams = {
    min?: number;
    max?: number;
};
declare type arrayParams = {
    min?: number;
    max?: number;
    items?: any;
};
declare type alternativeParams = {
    property?: string;
    valid?: string[];
};
export declare class Joi {
    static readonly alternatives: (params?: alternativeParams) => any;
    static readonly string: (params?: stringParams) => any;
    static readonly requiredString: (params?: stringParams) => any;
    static readonly date: (params?: dateParams) => any;
    static readonly requiredDate: (params?: dateParams) => any;
    static readonly email: (params?: emailParams) => any;
    static readonly requiredEmail: (params?: emailParams) => any;
    static readonly number: (params?: numberParams) => any;
    static readonly requiredNumber: (params?: numberParams) => any;
    static readonly schemaArray: (itemSchema: any) => any;
    static readonly array: (params?: arrayParams) => any;
    static readonly requiredArray: (params?: arrayParams) => any;
    static readonly bool: () => any;
    static readonly requiredBool: () => any;
    static readonly object: (schema?: object) => any;
    static readonly requiredObject: (schema?: object) => any;
    static readonly allowUnknown: {
        allowUnknown: boolean;
    };
    static readonly validateSchema: (schema: any, params: any, options?: any) => Promise<any>;
}
export {};
