/**
 * Interfaces for the Cuéntica API integration
 */

/**
 * Generic response format from the Cuéntica API
 * @interface ICuenticaResponse
 */
export interface ICuenticaResponse {
	success?: boolean;
	error?: string;
	data?: any;
}

/**
 * Invoice data structure
 * @interface IInvoice
 */
export interface IInvoice {
	id?: string;
	number?: string;
	date: string;
	dueDate?: string;
	customerId?: string;
	items?: IInvoiceItem[];
	total?: number;
	status?: string;
	description?: string;
}

/**
 * Invoice line item structure
 * @interface IInvoiceItem
 */
export interface IInvoiceItem {
	description: string;
	quantity: number;
	unitPrice: number;
	taxRate: number;
}

/**
 * Expense data structure
 * @interface IExpense
 */
export interface IExpense {
	id?: string;
	date: string;
	description?: string;
	providerId?: string;
	amount?: number;
	status?: string;
}

/**
 * Customer data structure
 * @interface ICustomer
 */
export interface ICustomer {
	id?: string;
	name: string;
	vatNumber?: string;
	email?: string;
	address?: string;
	country?: string;
}

/**
 * Provider data structure
 * @interface IProvider
 */
export interface IProvider {
	id?: string;
	name: string;
	vatNumber?: string;
	email?: string;
	address?: string;
	country?: string;
}

/**
 * Company data structure
 * @interface ICompany
 */
export interface ICompany {
	id?: string;
	name: string;
	vatNumber: string;
	email?: string;
	address?: string;
	country?: string;
}
