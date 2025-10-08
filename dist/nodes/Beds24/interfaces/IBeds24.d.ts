export interface IBeds24Response {
    success: boolean;
    data?: any;
    error?: string;
}
export interface IBooking {
    bookId?: string;
    propId: string;
    roomId: string;
    firstName: string;
    lastName: string;
    email: string;
    checkIn: string;
    checkOut: string;
    status: string;
    price: number;
}
export interface IAvailability {
    propId: string;
    roomId: string;
    date: string;
    available: boolean;
    price?: number;
}
export interface IRate {
    propId: string;
    roomId: string;
    date: string;
    rate: number;
    minimumStay?: number;
}
//# sourceMappingURL=IBeds24.d.ts.map