import { Person } from "../alltypes";

export interface Client extends Person {
    address: string;
    companyId: number;
}