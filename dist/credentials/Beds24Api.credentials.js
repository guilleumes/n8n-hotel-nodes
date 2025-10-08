"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beds24Api = void 0;
class Beds24Api {
    name = 'beds24Api';
    displayName = 'Beds24 API';
    documentationUrl = 'https://beds24.com/api/';
    icon = {
        light: 'file:../nodes/Beds24/beds24.svg',
        dark: 'file:../nodes/Beds24/beds24.svg',
    };
    properties = [
        {
            displayName: 'API Token',
            name: 'token',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            description: 'The Beds24 API v2 token',
        },
    ];
    authenticate = {
        type: 'generic',
        properties: {
            headers: {
                'token': '={{$credentials.token}}',
            },
        },
    };
    test = {
        request: {
            baseURL: 'https://api.beds24.com/v2',
            url: '/bookings',
            method: 'GET',
        },
    };
}
exports.Beds24Api = Beds24Api;
//# sourceMappingURL=Beds24Api.credentials.js.map