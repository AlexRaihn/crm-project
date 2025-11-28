import { Person, emptyPerson } from "../alltypes";
import { Company } from "./Companies";

export interface Client extends Person {
    address: string;
    companyId: Company['id'];
}

export const emptyClient: Client = {
    ...emptyPerson,
    address: '',
    companyId: 0,
};