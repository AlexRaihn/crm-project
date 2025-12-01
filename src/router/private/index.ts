import { RouteRecordRaw } from "vue-router";

import type { RouteCustomMeta } from "@/types/config";

import PrivateView from "@/views/Private/PrivateView.vue";
import CrmUsersView from "@/views/Private/CrmUsersView.vue";
import DashboardView from "@/views/Private/DashboardView.vue";
import SalesView from "@/views/Private/Sales/SalesView.vue";

import { companiesViews } from "./companies";
import { clientsViews } from "./clients";

const optionsMeta: RouteCustomMeta = {
    guest: false,
    role: [],
    title: 'Система'
};

export const privateViews: RouteRecordRaw[] = [
    {
        name: 'PrivateView',
        path: '/private',
        component: PrivateView,
        meta: optionsMeta,     
        redirect: { name: 'DashboardView' },
        children: [
            {
                path: 'dashboard',
                name: 'DashboardView',
                component: DashboardView,
                meta: {
                    title: 'Панель управления',
                },
            },
            {
                path: 'crm-users',
                name: 'CrmUsersView',
                component: CrmUsersView,
                meta: {
                    title: 'Пользователи CRM',
                    role: [1, 2]
                }
            },
            {
                path: 'sales',
                name: 'SalesView',
                component: SalesView,
                meta: {
                    title: 'Сделки',
                    role: []
                }
            },
            ...companiesViews,
            ...clientsViews
        ]
    }
]