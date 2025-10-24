import { Person } from "../alltypes";
import { Company } from "./Companies";

export interface Client extends Person {
    address: string;
    companyId: Company['id'];
}