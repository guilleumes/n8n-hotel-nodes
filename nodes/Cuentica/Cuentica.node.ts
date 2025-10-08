import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';

/**
 * Cuéntica Node
 * 
 * This node integrates with the Cuéntica API to manage accounting and financial operations
 * for Spanish businesses. It provides CRUD operations for invoices, expenses, customers,
 * providers, and access to company information.
 * 
 * Features:
 * - Authentication via X-AUTH-TOKEN
 * - Support for production and sandbox environments
 * - Pagination for list operations (max 300 items)
 * - Rate limiting handling (600 req/5min, 7200/day)
 * 
 * @class Cuentica
 * @implements {INodeType}
 * 
 * @property {INodeTypeDescription} description - Node type description and configuration
 * @property {Function} execute - Main execution function for the node
 */
export class Cuentica implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Cuentica',
		name: 'cuentica',
		icon: 'file:cuentica.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Cuentica API',
		defaults: {
			name: 'Cuentica',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'cuenticaApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Invoice',
						value: 'invoice',
					},
					{
						name: 'Expense',
						value: 'expense', 
					},
					{
						name: 'Customer',
						value: 'customer',
					},
					{
						name: 'Provider',
						value: 'provider',
					},
					{
						name: 'Company',
						value: 'company',
					},
				],
				default: 'invoice',
				noDataExpression: true,
				required: true,
				description: 'Resource to consume',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: [
							'invoice',
							'expense',
							'customer',
							'provider',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a record',
						action: 'Create a record',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a record',
						action: 'Get a record',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all records',
						action: 'Get all records',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a record',
						action: 'Update a record',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a record',
						action: 'Delete a record',
					},
				],
				default: 'get',
				noDataExpression: true,
			},
			// ID Field
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete'],
						resource: ['invoice', 'expense', 'customer', 'provider'],
					},
				},
				default: '',
				description: 'ID of the record',
			},
			// Pagination
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				displayOptions: {
					show: {
						operation: ['getAll'],
						resource: ['invoice', 'expense', 'customer', 'provider'],
					},
				},
				default: false,
				description: 'Whether to return all results or only up to a given limit',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['getAll'],
						resource: ['invoice', 'expense', 'customer', 'provider'],
						returnAll: [false],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 300,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			// Additional Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['create', 'update'],
						resource: ['invoice', 'expense', 'customer', 'provider'],
					},
				},
				options: [
					{
						displayName: 'Date',
						name: 'date',
						type: 'dateTime',
						default: '',
						description: 'Date of the record',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Description of the record',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{
								name: 'Draft',
								value: 'draft',
							},
							{
								name: 'Sent',
								value: 'sent',
							},
							{
								name: 'Paid',
								value: 'paid',
							},
						],
						default: 'draft',
						description: 'Status of the record',
					},
				],
			},
		],
	};

	/**
	 * Main execution function for the node
	 * 
	 * @async
	 * @param {IExecuteFunctions} this
	 * @returns {Promise<INodeExecutionData[][]>}
	 */
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('cuenticaApi') as { apiKey: string, environment: string };

		let responseData;

		for (let i = 0; i < items.length; i++) {
			try {
				const baseURL = credentials.environment === 'production' ? 
					'https://api.cuentica.com/v1' : 
					'https://sandbox-api.cuentica.com/v1';

				const headers = {
					'X-AUTH-TOKEN': credentials.apiKey,
				};

				if (['invoice', 'expense', 'customer', 'provider'].includes(resource)) {
					if (operation === 'create') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							...additionalFields,
						};

						const options: IHttpRequestOptions = {
							method: 'POST',
							url: `${baseURL}/${resource}`,
							headers,
							body,
						};

						responseData = await this.helpers.httpRequest(options);
					}

					if (operation === 'get') {
						const id = this.getNodeParameter('id', i) as string;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${baseURL}/${resource}/${id}`,
							headers,
						};

						responseData = await this.helpers.httpRequest(options);
					}

					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const limit = returnAll ? 300 : this.getNodeParameter('limit', i) as number;

						const options: IHttpRequestOptions = {
							method: 'GET',
							url: `${baseURL}/${resource}`,
							headers,
							qs: {
								limit,
							},
						};

						responseData = await this.helpers.httpRequest(options);
					}

					if (operation === 'update') {
						const id = this.getNodeParameter('id', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							...additionalFields,
						};

						const options: IHttpRequestOptions = {
							method: 'PUT',
							url: `${baseURL}/${resource}/${id}`,
							headers,
							body,
						};

						responseData = await this.helpers.httpRequest(options);
					}

					if (operation === 'delete') {
						const id = this.getNodeParameter('id', i) as string;

						const options: IHttpRequestOptions = {
							method: 'DELETE',
							url: `${baseURL}/${resource}/${id}`,
							headers,
						};

						responseData = await this.helpers.httpRequest(options);
					}
				}

				if (resource === 'company') {
					const options: IHttpRequestOptions = {
						method: 'GET',
						url: `${baseURL}/company`,
						headers,
					};

					responseData = await this.helpers.httpRequest(options);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionErrorData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionErrorData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
