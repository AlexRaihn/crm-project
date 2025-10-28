import { RouteRecordRaw } from "vue-router";

import type { RouteCustomMeta } from "@/types/config";

import CompaniesView from "@/views/Private/Clients/Companies/CompaniesView.vue";

const optionsMeta: RouteCustomMeta = {
    guest: false,
    role: [],
    title: 'Компании'
};

export const companiesViews: RouteRecordRaw[] = [
    {
        path: '/companies',
        name: 'CompaniesView',
        meta: optionsMeta,
        component: CompaniesView,
        children: []
    }
];