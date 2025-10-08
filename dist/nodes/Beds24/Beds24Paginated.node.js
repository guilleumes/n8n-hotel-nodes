"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beds24Paginated = void 0;
class Beds24Paginated {
    description = {
        displayName: 'Beds24 Paginated',
        name: 'beds24Paginated',
        icon: 'file:./beds24.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Consume Beds24 API (con paginación automática)',
        defaults: {
            name: 'Beds24 Paginated',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'beds24Api',
                required: true,
            },
        ],
        requestDefaults: {
            baseURL: 'https://api.beds24.com/v2',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        },
        properties: [
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Booking',
                        value: 'booking',
                    },
                ],
                default: 'booking',
            },
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                displayOptions: {
                    show: {
                        resource: [
                            'booking',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Get',
                        value: 'get',
                        description: 'Get a booking by ID',
                        action: 'Get a booking',
                    },
                    {
                        name: 'Get Many',
                        value: 'getMany',
                        description: 'Get multiple bookings with filters',
                        action: 'Get multiple bookings',
                    },
                    {
                        name: 'Update',
                        value: 'update',
                        description: 'Update a booking',
                        action: 'Update a booking',
                    },
                ],
                default: 'get',
            },
            {
                displayName: 'Booking ID',
                name: 'bookingId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        resource: [
                            'booking',
                        ],
                        operation: [
                            'get',
                            'update',
                        ],
                    },
                },
                default: '',
                description: 'The ID of the booking',
            },
            {
                displayName: 'Update Method',
                name: 'updateMethod',
                type: 'options',
                displayOptions: {
                    show: {
                        resource: [
                            'booking',
                        ],
                        operation: [
                            'update',
                        ],
                    },
                },
                options: [
                    {
                        name: 'Simple Fields',
                        value: 'simple',
                        description: 'Update specific fields',
                    },
                    {
                        name: 'Raw JSON',
                        value: 'raw',
                        description: 'Provide the complete update data as JSON',
                    },
                ],
                default: 'simple',
                description: 'Choose how to update the booking',
            },
            {
                displayName: 'Raw Update Data',
                name: 'rawUpdateData',
                type: 'json',
                displayOptions: {
                    show: {
                        resource: [
                            'booking',
                        ],
                        operation: [
                            'update',
                        ],
                        updateMethod: [
                            'raw',
                        ],
                    },
                },
                default: `{
			"id": "{{ $json.data[0].id }}",
			"guestName": "John Doe",
			"guestEmail": "john@example.com",
			"guestPhone": "+1234567890",
			"arrival": "2024-01-10",
			"departure": "2024-01-15",
			"status": "1",
			"notes": "Special requests"
			}`,
                description: 'The complete booking data in JSON format. The booking ID will be automatically added from the Booking ID field above.',
                required: true,
                typeOptions: {
                    alwaysOpenEditWindow: true,
                },
            },
            {
                displayName: 'Include Info Items',
                name: 'includeInfoItems',
                type: 'boolean',
                default: true,
                description: 'Whether to include info items in the response',
                displayOptions: {
                    show: {
                        resource: ['booking'],
                        operation: ['getMany'],
                    },
                },
            },
            {
                displayName: 'Include Invoice Items',
                name: 'includeInvoiceItems',
                type: 'boolean',
                default: false,
                description: 'Whether to include invoice items in the response',
                displayOptions: {
                    show: {
                        resource: ['booking'],
                        operation: ['getMany'],
                    },
                },
            },
            {
                displayName: 'Filters',
                name: 'filters',
                type: 'collection',
                placeholder: 'Add Filter',
                default: {},
                displayOptions: {
                    show: {
                        resource: [
                            'booking',
                        ],
                        operation: [
                            'getMany',
                        ],
                    },
                },
                options: [
                    {
                        displayName: 'Filter Type',
                        name: 'filter',
                        type: 'options',
                        options: [
                            {
                                name: 'Arrivals Today',
                                value: 'arrivals',
                                description: 'Returns bookings arriving today',
                            },
                            {
                                name: 'Departures Today',
                                value: 'departures',
                                description: 'Returns confirmed, new and request bookings departing today',
                            },
                            {
                                name: 'New Bookings',
                                value: 'new',
                                description: 'Returns bookings created in the past 24 hours',
                            },
                            {
                                name: 'Current Bookings',
                                value: 'current',
                                description: 'Returns bookings with check-in before/on today and check-out after/on today',
                            },
                        ],
                        default: 'current',
                    },
                    {
                        displayName: 'Property IDs',
                        name: 'propertyId',
                        type: 'string',
                        default: '',
                        description: 'Comma-separated list of property IDs',
                    },
                    {
                        displayName: 'Room IDs',
                        name: 'roomId',
                        type: 'string',
                        default: '',
                        description: 'Comma-separated list of room IDs',
                    },
                    {
                        displayName: 'Arrival Date',
                        name: 'arrival',
                        type: 'string',
                        default: '',
                        description: 'Filter by exact arrival date (YYYY-MM-DD)',
                    },
                    {
                        displayName: 'Arrival Date From',
                        name: 'arrivalFrom',
                        type: 'string',
                        default: '',
                        description: 'Filter by arrival date from (YYYY-MM-DD)',
                    },
                    {
                        displayName: 'Arrival Date To',
                        name: 'arrivalTo',
                        type: 'string',
                        default: '',
                        description: 'Filter by arrival date to (YYYY-MM-DD)',
                    },
                    {
                        displayName: 'Departure Date',
                        name: 'departure',
                        type: 'string',
                        default: '',
                        description: 'Filter by exact departure date (YYYY-MM-DD)',
                    },
                    {
                        displayName: 'Departure Date From',
                        name: 'departureFrom',
                        type: 'string',
                        default: '',
                        description: 'Filter by departure date from (YYYY-MM-DD)',
                    },
                    {
                        displayName: 'Departure Date To',
                        name: 'departureTo',
                        type: 'string',
                        default: '',
                        description: 'Filter by departure date to (YYYY-MM-DD)',
                    },
                    {
                        displayName: 'Booking Time From',
                        name: 'bookingTimeFrom',
                        type: 'string',
                        default: '',
                        description: 'Filter by booking time from (YYYY-MM-DDTHH:MM:SS in UTC)',
                    },
                    {
                        displayName: 'Booking Time To',
                        name: 'bookingTimeTo',
                        type: 'string',
                        default: '',
                        description: 'Filter by booking time to (YYYY-MM-DDTHH:MM:SS in UTC)',
                    },
                    {
                        displayName: 'Modified From',
                        name: 'modifiedFrom',
                        type: 'string',
                        default: '',
                        description: 'Filter by modified time from (YYYY-MM-DDTHH:MM:SS)',
                    },
                    {
                        displayName: 'Modified To',
                        name: 'modifiedTo',
                        type: 'string',
                        default: '',
                        description: 'Filter by modified time to (YYYY-MM-DDTHH:MM:SS)',
                    },
                    {
                        displayName: 'Search String',
                        name: 'searchString',
                        type: 'string',
                        default: '',
                        description: 'Search in guest name, email, apiref or bookingId',
                    },
                    {
                        displayName: 'Include Invoice Items',
                        name: 'includeInvoiceItems',
                        type: 'hidden',
                        default: false,
                    },
                    {
                        displayName: 'Include Info Items',
                        name: 'includeInfoItems',
                        type: 'hidden',
                        default: true,
                    },
                ],
            },
            {
                displayName: 'Update Fields',
                name: 'updateFields',
                type: 'collection',
                placeholder: 'Add Field',
                default: {},
                displayOptions: {
                    show: {
                        resource: [
                            'booking',
                        ],
                        operation: [
                            'update',
                        ],
                        updateMethod: [
                            'simple',
                        ],
                    },
                },
                options: [
                    {
                        displayName: 'Status',
                        name: 'status',
                        type: 'options',
                        options: [
                            {
                                name: 'Confirmed',
                                value: 'confirmed',
                            },
                            {
                                name: 'Cancelled',
                                value: 'cancelled',
                            },
                            {
                                name: 'Request',
                                value: 'request',
                            },
                        ],
                        default: 'confirmed',
                    },
                    {
                        displayName: 'First Name',
                        name: 'firstName',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Last Name',
                        name: 'lastName',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Email',
                        name: 'email',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Phone',
                        name: 'phone',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Notes',
                        name: 'notes',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Arrival',
                        name: 'arrival',
                        type: 'string',
                        default: '',
                        description: 'Arrival date (YYYY-MM-DD)',
                    },
                    {
                        displayName: 'Departure',
                        name: 'departure',
                        type: 'string',
                        default: '',
                        description: 'Departure date (YYYY-MM-DD)',
                    },
                ],
            },
            {
                displayName: 'Additional Fields',
                name: 'additionalFields',
                type: 'collection',
                placeholder: 'Add Field',
                default: {},
                displayOptions: {
                    show: {
                        resource: [
                            'booking',
                        ],
                        operation: [
                            'get',
                        ],
                    },
                },
                options: [
                    {
                        displayName: 'Include Invoice Items',
                        name: 'includeInvoiceItems',
                        type: 'boolean',
                        default: false,
                    },
                    {
                        displayName: 'Include Info Items',
                        name: 'includeInfoItems',
                        type: 'boolean',
                        default: false,
                    },
                ],
            },
        ],
    };
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < items.length; i++) {
            try {
                const credentials = await this.getCredentials('beds24Api');
                if (resource === 'booking' && operation === 'get') {
                    const bookingId = this.getNodeParameter('bookingId', i);
                    const additionalFields = this.getNodeParameter('additionalFields', i, {});
                    let queryParams = `?id=${bookingId}`;
                    if (additionalFields.includeInvoiceItems)
                        queryParams += '&includeInvoiceItems=true';
                    if (additionalFields.includeInfoItems)
                        queryParams += '&includeInfoItems=true';
                    const options = {
                        headers: { 'token': credentials.token },
                        method: 'GET',
                        baseURL: 'https://api.beds24.com/v2',
                        url: '/bookings' + queryParams,
                        json: true,
                    };
                    const response = await this.helpers.request(options);
                    returnData.push(response);
                }
                else if (operation === 'getMany') {
                    const filters = this.getNodeParameter('filters', i, {});
                    let queryParams = [];
                    if (filters.filter)
                        queryParams.push(`filter=${filters.filter}`);
                    if (filters.propertyId)
                        queryParams.push(`propertyId=${filters.propertyId}`);
                    if (filters.roomId)
                        queryParams.push(`roomId=${filters.roomId}`);
                    const dateFilters = [
                        'arrival', 'arrivalFrom', 'arrivalTo',
                        'departure', 'departureFrom', 'departureTo',
                        'bookingTimeFrom', 'bookingTimeTo',
                        'modifiedFrom', 'modifiedTo'
                    ];
                    for (const dateFilter of dateFilters) {
                        if (filters[dateFilter])
                            queryParams.push(`${dateFilter}=${filters[dateFilter]}`);
                    }
                    if (filters.searchString)
                        queryParams.push(`searchString=${filters.searchString}`);
                    const includeInvoiceItems = this.getNodeParameter('includeInvoiceItems', i, false);
                    const includeInfoItems = this.getNodeParameter('includeInfoItems', i, true);
                    if (includeInvoiceItems)
                        queryParams.push('includeInvoiceItems=true');
                    if (includeInfoItems)
                        queryParams.push('includeInfoItems=true');
                    let allData = [];
                    let nextPageUrl = '/bookings' + (queryParams.length > 0 ? '?' + queryParams.join('&') : '');
                    const baseURL = 'https://api.beds24.com/v2';
                    const headers = { 'token': credentials.token };
                    while (nextPageUrl) {
                        const options = {
                            headers,
                            method: 'GET',
                            baseURL,
                            url: nextPageUrl,
                            json: true,
                        };
                        const response = await this.helpers.request(options);
                        if (Array.isArray(response.data)) {
                            allData.push(...response.data);
                        }
                        else if (response.data) {
                            allData.push(response.data);
                        }
                        if (response.pages && response.pages.nextPageExists && response.pages.nextPageLink) {
                            nextPageUrl = response.pages.nextPageLink.replace(baseURL, '');
                        }
                        else {
                            nextPageUrl = null;
                        }
                    }
                    returnData.push(...allData);
                }
                else if (operation === 'update') {
                    const bookingId = this.getNodeParameter('bookingId', i);
                    const updateMethod = this.getNodeParameter('updateMethod', i);
                    let updateData;
                    if (updateMethod === 'raw') {
                        const rawData = this.getNodeParameter('rawUpdateData', i);
                        updateData = JSON.parse(rawData);
                        updateData.id = parseInt(bookingId, 10);
                    }
                    else {
                        const updateFields = this.getNodeParameter('updateFields', i, {});
                        updateData = { id: parseInt(bookingId, 10) };
                        if (updateFields.status)
                            updateData.status = updateFields.status;
                        if (updateFields.firstName || updateFields.lastName)
                            updateData.guestName = `${updateFields.firstName || ''} ${updateFields.lastName || ''}`.trim();
                        if (updateFields.email)
                            updateData.guestEmail = updateFields.email;
                        if (updateFields.phone)
                            updateData.guestPhone = updateFields.phone;
                        if (updateFields.notes)
                            updateData.notes = updateFields.notes;
                        if (updateFields.arrival)
                            updateData.arrival = updateFields.arrival;
                        if (updateFields.departure)
                            updateData.departure = updateFields.departure;
                    }
                    const options = {
                        headers: {
                            'token': credentials.token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        baseURL: 'https://api.beds24.com/v2',
                        url: '/bookings',
                        body: [updateData],
                    };
                    const response = await this.helpers.request(options);
                    returnData.push(response);
                }
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                if (this.continueOnFail()) {
                    returnData.push({ error: errorMessage });
                    continue;
                }
                throw error;
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}
exports.Beds24Paginated = Beds24Paginated;
//# sourceMappingURL=Beds24Paginated.node.js.map