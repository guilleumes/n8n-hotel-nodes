export interface ICuenticaResponse {
    success?: boolean;
    error?: string;
    data?: any;
}
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
export interface IInvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
}
export interface IExpense {
    id?: string;
    date: string;
    description?: string;
    providerId?: string;
    amount?: number;
    status?: string;
}
export interface ICustomer {
    id?: string;
    name: string;
    vatNumber?: string;
    email?: string;
    address?: string;
    country?: string;
}
export interface IProvider {
    id?: string;
    name: string;
    vatNumber?: string;
    email?: string;
    address?: string;
    country?: string;
}
export interface ICompany {
    id?: string;
    name: string;
    vatNumber: string;
    email?: string;
    address?: string;
    country?: string;
}
//# sourceMappingURL=ICuentica.d.ts.map