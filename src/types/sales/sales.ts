export interface Sale {
    id: number;
    clientId: number;
    organizationId?: number;
    description?: string;
    salesId: number;
    price: number;
    date: string;
    status: number;
}