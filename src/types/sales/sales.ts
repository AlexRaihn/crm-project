import { Company } from "../clients/Companies";
import { Client } from "../clients/Clients";
import { Person } from "../alltypes";

import { saleStatus, salesStatusOptions } from "@/enums/sales";

export interface Sale {
    id: number;
    clientId: Client['id'];
    companyId?: Company['id'];
    description?: string;
    salerId: number;
    price: number;
    dateStart?: Date;
    dateEnd?: Date
    status: saleStatus['value'];
}

export const emptySaleModel: Sale = {
    id: 0,
    clientId: 0,
    companyId: 0,
    description: '',
    salerId: 0,
    price: 0,
    dateStart: new Date(),
    dateEnd: undefined,
    status: salesStatusOptions[0].value
}

export interface Saler extends Person {
}