import {Person, emptyPerson} from './alltypes'

import { RouteMeta } from 'vue-router';

export type RouteCustomMeta = RouteMeta & {
    guest?: boolean;
    title?: string;
    role?: number[];
}

export interface CrmUser extends Person {
    role: number,
    password: string;
    login: string;
}

export const emptyCrmUser: CrmUser = {
    ...emptyPerson,
    role: 0,
    password: '',
    login: '',
};