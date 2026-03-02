import { Company } from "../clients/Companies";
import { Client } from "../clients/Clients";
import { Person } from "../alltypes";

import type { DateValue } from '@internationalized/date'
import { fromDate, getLocalTimeZone } from '@internationalized/date'

import { saleStatus, salesStatusOptions } from "@/enums/sales";

export interface Sale {
    id: number;
    clientId: Client['id'];
    companyId?: Company['id'];
    description?: string;
    salerId: number;
    price: number;
    dateStart: DateValue | null;
    dateEnd: DateValue | null;
    status: saleStatus['value'];
}

export const emptySaleModel: Sale = {
    id: 0,
    clientId: 0,
    companyId: 0,
    description: '',
    salerId: 0,
    price: 0,
    dateStart: fromDate(new Date(), getLocalTimeZone()),
    dateEnd: fromDate(new Date(Date.now() + 24 * 60 * 60 * 1000), getLocalTimeZone()),
    status: salesStatusOptions[0].value
}

export interface Saler extends Person {
}