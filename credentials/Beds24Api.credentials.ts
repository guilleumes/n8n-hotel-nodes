/**
 * Beds24 API Credentials
 * 
 * Credentials configuration for accessing the Beds24 API v2.
 * Uses API token authentication for secure access to booking and property management.
 * 
 * Rate Limits:
 * - Maximum of 1000 requests per hour
 * 
 * @class Beds24Api
 * @implements {ICredentialType}
 * 
 * @property {string} name - Credential type name
 * @property {string} displayName - Display name for the credential
 * @property {Object} properties - Credential properties configuration
 */
import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class Beds24Api implements ICredentialType {
	name = 'beds24Api';
	displayName = 'Beds24 API';
	documentationUrl = 'https://beds24.com/api/';
	icon = {
		light: 'file:../nodes/Beds24/beds24.svg',
		dark: 'file:../nodes/Beds24/beds24.svg',
	} as const;
	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'token': '={{$credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.beds24.com/v2',
			url: '/bookings',
			method: 'GET',
		},
	};
}
