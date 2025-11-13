import { Company } from "../clients/Companies";
import { Client } from "../clients/Clients";
import { Person } from "../alltypes";

import { saleStatus } from "@/enums/sales";

export interface Sale {
    id: number;
    clientId: Client['id'];
    companyId?: Company['id'];
    description?: string;
    salerId: number;
    price: number;
    dateStart: Date;
    dateEnd: Date
    status: saleStatus['value'];
}

export interface Saler extends Person {
}