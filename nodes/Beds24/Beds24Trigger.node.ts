import type {
	IWebhookFunctions,
	IWebhookResponseData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

export class Beds24Trigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Beds24 Trigger',
		name: 'beds24Trigger',
		icon: 'file:beds24.svg',
		group: ['trigger'],
		version: 1,
		description: 'Handle Beds24 webhook events',
		defaults: {
			name: 'Beds24 Trigger',
		},
		inputs: [],
		outputs: ['main'],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				options: [
					{
						name: 'Booking Created',
						value: 'bookingCreated',
						description: 'Triggered when a new booking is created',
					},
					{
						name: 'Booking Modified',
						value: 'bookingModified',
						description: 'Triggered when a booking is modified',
					},
					{
						name: 'Booking Cancelled',
						value: 'bookingCancelled',
						description: 'Triggered when a booking is cancelled',
					},
					{
						name: 'Payment Received',
						value: 'paymentReceived',
						description: 'Triggered when a payment is received',
					},
				],
			},
			{
				displayName: 'Authentication Token',
				name: 'authToken',
				type: 'string',
				default: '',
				required: true,
				description: 'Token to authenticate incoming webhooks',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const headerData = this.getHeaderData();
		const webhookData = this.getWorkflowStaticData('node');
		const authToken = this.getNodeParameter('authToken') as string;

		// Verificar el token de autenticación
		const receivedToken = headerData.authorization as string;
		if (!receivedToken || receivedToken !== `Bearer ${authToken}`) {
			return {
				webhookResponse: {
					statusCode: 401,
					body: {
						status: 'error',
						message: 'Unauthorized',
					},
				},
			};
		}

		// Obtener los eventos configurados
		const events = this.getNodeParameter('events', []) as string[];

		// Procesar el webhook
		try {
			const body = req.body as IDataObject;
			let eventType = 'unknown';

			// Determinar el tipo de evento
			if (body.status === 'cancelled') {
				eventType = 'bookingCancelled';
			} else if (body.bookingTime && !body.modifiedTime) {
				eventType = 'bookingCreated';
			} else if (body.modifiedTime) {
				eventType = 'bookingModified';
			} else if (body.payment || body.deposit) {
				eventType = 'paymentReceived';
			}

			// Verificar si el evento está configurado para ser procesado
			if (!events.includes(eventType)) {
				return {
					webhookResponse: {
						statusCode: 200,
						body: {
							status: 'skipped',
							message: 'Event type not configured',
						},
					},
				};
			}

			// Retornar los datos del webhook para ser procesados
			return {
				workflowData: [
					[
						{
							json: {
								eventType,
								body,
								headers: headerData,
								timestamp: new Date().toISOString(),
							},
						},
					],
				],
			};

		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			return {
				webhookResponse: {
					statusCode: 400,
					body: {
						status: 'error',
						message: errorMessage,
					},
				},
			};
		}
	}
}
