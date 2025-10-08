"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuenticaApi = void 0;
class CuenticaApi {
    name = 'cuenticaApi';
    displayName = 'Cuentica API';
    documentationUrl = 'https://api.cuentica.com/docs';
    icon = {
        light: 'file:../nodes/Cuentica/cuentica.svg',
        dark: 'file:../nodes/Cuentica/cuentica.svg',
    };
    properties = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            description: 'The API key obtained from Cuentica',
        },
        {
            displayName: 'Environment',
            name: 'environment',
            type: 'options',
            options: [
                {
                    name: 'Production',
                    value: 'production',
                },
                {
                    name: 'Sandbox',
                    value: 'sandbox',
                },
            ],
            default: 'production',
            description: 'The environment to use (production or sandbox)',
        },
    ];
    authenticate = {
        type: 'generic',
        properties: {
            headers: {
                'Authorization': '={{$credentials.apiKey}}',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        },
    };
    test = {
        request: {
            baseURL: '={{$credentials.environment === "production" ? "https://api.cuentica.com/v1" : "https://sandbox-api.cuentica.com/v1"}}',
            url: '/me',
            method: 'GET',
        },
    };
}
exports.CuenticaApi = CuenticaApi;
//# sourceMappingURL=CuenticaApi.credentials.js.map