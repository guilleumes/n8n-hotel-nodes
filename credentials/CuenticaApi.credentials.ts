import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

/**
 * Cuéntica API Credentials
 * 
 * Credentials configuration for accessing the Cuéntica API.
 * Supports both production and sandbox environments with API token authentication.
 * 
 * Rate Limits:
 * - 600 requests per 5 minutes
 * - 7200 requests per day
 * 
 * @class CuenticaApi
 * @implements {ICredentialType}
 * 
 * @property {string} name - Credential type name
 * @property {string} displayName - Display name for the credential
 * @property {Object} properties - Credential properties configuration
 */
export class CuenticaApi implements ICredentialType {
	name = 'cuenticaApi';
	displayName = 'Cuentica API';
	documentationUrl = 'https://api.cuentica.com/docs';
	icon = {
		light: 'file:../nodes/Cuentica/cuentica.svg',
		dark: 'file:../nodes/Cuentica/cuentica.svg',
	} as const;
	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '={{$credentials.apiKey}}',
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment === "production" ? "https://api.cuentica.com/v1" : "https://sandbox-api.cuentica.com/v1"}}',
			url: '/me',
			method: 'GET',
		},
	};
}
